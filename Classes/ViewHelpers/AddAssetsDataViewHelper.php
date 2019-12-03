<?php
namespace HauerHeinrich\HhThemeJobsdahoam\ViewHelpers;

/***************************************************************
 * Copyright notice
 *
 * (c) 2018 Christian Hackl <hackl.chris@googlemail.com>
 * All rights reserved
 *
 * This script is part of the TYPO3 project. The TYPO3 project is
 * free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * The GNU General Public License can be found at
 * http://www.gnu.org/copyleft/gpl.html.
 *
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * This copyright notice MUST APPEAR in all copies of the script!
 * Example
 * <html xmlns:f="http://typo3.org/ns/TYPO3/CMS/Fluid/ViewHelpers"
 *   xmlns:hh="http://typo3.org/ns/VENDOR/NAMESPACE/ViewHelpers"
 *   data-namespace-typo3-fluid="true">
 *
 *  <hh:addAssetsData type="js">
 *  or
 *  <hh:addAssetsData type="js" where="header">
 */

// use TYPO3\CMS\Extbase\Utility\DebuggerUtility;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class AddAssetsDataViewHelper extends AbstractViewHelper {
    public function initializeArguments() {
        $this->registerArgument('type', 'string', 'Can be css or js or json-ld', true);
        $this->registerArgument('where', 'string', 'Can be header (header is default for css) or footer (footer is default for js)', false);
        $this->registerArgument('file', 'string', 'Can be css or js', false);
        $this->registerArgument('current', 'boolean', 'Used for "file", if source is in current extension', false, true);
        $this->registerArgument('class', 'string', 'class attribute', false);
        $this->registerArgument('exclude', 'string', 'For CSS and JS files - excludeFromConcatenation ', false, true);
    }

    /**
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     *
     * @return string
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext) {
        $pageRender = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        if (isset($arguments)) {
            # code...
        }

        switch ($arguments['type']) {
            case 'css':
                $where = $arguments['where'] ? 'additional'.ucfirst($arguments['where']).'Data' : 'additionalHeaderData';
                if($GLOBALS['TSFE']->$where['themeCSS']) {
                    $searchReplaceArray = array(
                        '<style>' => '',
                        '</style>' => ''
                    );
                    $resultOLD = str_replace(
                        array_keys($searchReplaceArray),
                        array_values($searchReplaceArray),
                        $GLOBALS['TSFE']->$where['themeCSS']
                    );
                    $resultNEW = str_replace(
                        array_keys($searchReplaceArray),
                        array_values($searchReplaceArray),
                        trim($renderChildrenClosure())
                    );

                    $GLOBALS['TSFE']->$where['themeCSS'] = "<style>" . $resultOLD . $resultNEW ."</style>";
                } else {
                    $GLOBALS['TSFE']->$where['themeCSS'] = htmlspecialchars(trim($renderChildrenClosure()));
                }

                // ToDo: $pageRender->addCssInlineBlock();
                break;
            case 'js':
                $where = $arguments['where'] ? 'additional'.ucfirst($arguments['where']).'Data' : 'additionalFooterData';
                if($GLOBALS['TSFE']->$where['themeJS']) {
                    $searchReplaceArray = array(
                        '<script>' => '',
                        '</script>' => ''
                    );
                    $resultOLD = str_replace(
                        array_keys($searchReplaceArray),
                        array_values($searchReplaceArray),
                        $GLOBALS['TSFE']->$where['themeJS']
                    );
                    $resultNEW = str_replace(
                        array_keys($searchReplaceArray),
                        array_values($searchReplaceArray),
                        trim($renderChildrenClosure())
                    );

                    $GLOBALS['TSFE']->$where['themeJS'] = "<script>" . $resultOLD . $resultNEW ."</script>";
                } else {
                    $GLOBALS['TSFE']->$where['themeJS'] = trim($renderChildrenClosure());
                }

                // ToDo: $pageRender->addJsFooterInlineCode();  ->addJsInlineCode();
                break;
            case 'cssFile':
                if($arguments['current'] === true) {
                    // Get current ExtKey from templatePath
                    $templatePaths = array_reverse($renderingContext->getTemplatePaths()->getTemplateRootPaths());
                    $extKey = '';
                    foreach ($templatePaths as $key => $value) {
                        if(!empty($value)) {
                            $extKey = explode('/', explode('/ext/', $value)[1])[0];
                            break;
                        }
                    }

                    $path = 'EXT:'.$extKey.'/Resources/Public/Css/'.trim($arguments['file']);
                } else {
                    $path = trim($arguments['file']);
                }
                $pageRender->addCssFile($path, 'stylesheet', 'all', '', true, false, '', $arguments['exclude'] );
                break;
            case 'jsFile':
                if($arguments['current'] === true) {
                    // Get current ExtKey from templatePath
                    $templatePaths = array_reverse($renderingContext->getTemplatePaths()->getTemplateRootPaths());
                    $extKey = '';
                    foreach ($templatePaths as $key => $value) {
                        if(!empty($value)) {
                            $extKey = explode('/', explode('/ext/', $value)[1])[0];
                            break;
                        }
                    }

                    $path = 'EXT:'.$extKey.'/Resources/Public/JavaScript/'.trim($arguments['file']);
                } else {
                    $path = trim($arguments['file']);
                }

                if($arguments['where'] == "header") {
                    $pageRender->addJsFile($path, '', true, false, '', $arguments['exclude'], '|', false, '', true);
                } else {
                    $pageRender->addJsFooterFile($path, '', true, false, '', $arguments['exclude'], '|', false, '', true);
                }
                break;
            case 'json':
                $pageRender->addHeaderData('<script type="application/json" class="'.$arguments['class'].'">'.trim($renderChildrenClosure()).'</script>');
                break;
            case 'json-ld':
                $pageRender->addHeaderData('<script type="application/ld+json" class="'.$arguments['class'].'">'.trim($renderChildrenClosure()).'</script>');
                break;
            default:
                $GLOBALS['TSFE']->additionalFooterData[] = "<div class='error'>ERROR: no or wrong tag in AddHeaderDataViewHelper</div>";
                break;
        }
    }
}
