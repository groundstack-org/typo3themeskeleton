<?php
namespace GroundStack\Typo3ThemeSkeleton\DataProcessing;

// use TYPO3\CMS\Extbase\Utility\DebuggerUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\Resource\FileCollector;
use TYPO3\CMS\Core\Utility\RootlineUtility;

class FilesProcessor implements DataProcessorInterface {
    /**
     * Process data of a record to resolve File objects to the view
     *
     * @param ContentObjectRenderer $cObj The data of the content element or page
     * @param array $contentObjectConfiguration The configuration of Content Object
     * @param array $processorConfiguration The configuration of this processor
     * @param array $processedData Key/value store of processed data (e.g. to be passed to a Fluid View)
     * @return array the processed data as key/value store
     */
    public function process(ContentObjectRenderer $cObj, array $contentObjectConfiguration, array $processorConfiguration, array $processedData) {
        if (isset($processorConfiguration['if.']) && !$cObj->checkIf($processorConfiguration['if.'])) {
            return $processedData;
        }

        // gather data
        /** @var FileCollector $fileCollector */
        $fileCollector = GeneralUtility::makeInstance(FileCollector::class);

        // references / relations
        if (!empty($processorConfiguration['references.'])) {
            $referenceConfiguration = $processorConfiguration['references.'];
            $relationField = $cObj->stdWrapValue('fieldName', $referenceConfiguration);
            $relationData = $cObj->stdWrapValue('data', $referenceConfiguration);

            // If no reference fieldName is set, there's nothing to do
            if (!empty($relationField)) {
                // Fetch the references of the default element
                $relationTable = $cObj->stdWrapValue('table', $referenceConfiguration, $cObj->getCurrentTable());

                if (!empty($relationTable)) {
                    $fileCollector->addFilesFromRelation($relationTable, $relationField, $cObj->data);

                    if(empty($fileCollector->getFiles()) && !empty($relationData)) {
                        $parts = explode(':', $relationData, 2);
                        $type = strtolower(trim($parts[0]));
                        $key = trim($parts[1] ?? '');

                        // - Page tree root [-2]
                        // - 1. page before [-1]
                        // - Site root (root template here!) [0]
                        // - Here you are! Current [1]
                        $relationDataHowDeep = -2;
                        switch ($type) {
                            case 'fullrootline':
                                $keyParts = GeneralUtility::trimExplode(',', $key);
                                $relationDataHowDeep = (int)$keyParts[0];
                                break;

                            default:
                                break;
                        }

                        $rootLine = GeneralUtility::makeInstance(RootlineUtility::class, $cObj->getData("field : uid"))->get();

                        // count 1,2,3 - starts not from 0 --- but rootLine does!
                        // so we have to ignore the current data | -1 == current
                        $rootLineLength = count($rootLine) - 1;

                        switch ($relationDataHowDeep) {
                            case 0:
                                $parentFiles = $cObj->rootLineValue($rootLine[0], $relationField);

                                if (!empty($parentFiles)) {
                                    $parentArrayFileUids = GeneralUtility::intExplode(',', $parentFiles, true);
                                    $fileCollector->addFileReferences($parentArrayFileUids);
                                    break;
                                }
                                break;

                            case -1:
                                $parentFiles = $cObj->rootLineValue($rootLineLength - 1, $relationField);

                                if (!empty($parentFiles)) {
                                    $parentArrayFileUids = GeneralUtility::intExplode(',', $parentFiles, true);
                                    $fileCollector->addFileReferences($parentArrayFileUids);
                                    break;
                                }
                                break;

                            default:
                                // relationDataHowDeep = -2
                                foreach ($rootLine as $key => $value) {
                                    // skip current data
                                    if($rootLineLength === $key) {
                                        continue;
                                    }

                                    $parentFiles = $cObj->rootLineValue($key, $relationField);

                                    if (!empty($parentFiles)) {
                                        $parentArrayFileUids = GeneralUtility::intExplode(',', $parentFiles, true);
                                        $fileCollector->addFileReferences($parentArrayFileUids);
                                        break;
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        }

        // files
        $files = $cObj->stdWrapValue('files', $processorConfiguration);
        if ($files) {
            $files = GeneralUtility::intExplode(',', $files, true);
            $fileCollector->addFiles($files);
        }

        // collections
        $collections = $cObj->stdWrapValue('collections', $processorConfiguration);
        if (!empty($collections)) {
            $collections = GeneralUtility::trimExplode(',', $collections, true);
            $fileCollector->addFilesFromFileCollections($collections);
        }

        // folders
        $folders = $cObj->stdWrapValue('folders', $processorConfiguration);
        if (!empty($folders)) {
            $folders = GeneralUtility::trimExplode(',', $folders, true);
            $fileCollector->addFilesFromFolders($folders, !empty($processorConfiguration['folders.']['recursive']));
        }

        // make sure to sort the files
        $sortingProperty = $cObj->stdWrapValue('sorting', $processorConfiguration);
        if ($sortingProperty) {
            $sortingDirection = $cObj->stdWrapValue(
                'direction',
                $processorConfiguration['sorting.'] ?? [],
                'ascending'
            );

            $fileCollector->sort($sortingProperty, $sortingDirection);
        }

        // set the files into a variable, default "files"
        $targetVariableName = $cObj->stdWrapValue('as', $processorConfiguration, 'files');
        $processedData[$targetVariableName] = $fileCollector->getFiles();

        return $processedData;
    }
}
