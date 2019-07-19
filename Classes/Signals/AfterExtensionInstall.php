<?php
namespace GroundStack\Typo3ThemeSkeleton\Signals;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

// use \TYPO3\CMS\Extbase\Utility\DebuggerUtility;
use \TYPO3\CMS\Core\SingletonInterface;
use \TYPO3\CMS\Core\Utility\GeneralUtility;
use \TYPO3\CMS\Extensionmanager\Service\ExtensionManagementService as ExtService;
use \TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Extensionmanager\Utility\InstallUtility;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class AfterExtensionInstall implements SingletonInterface {

    /**
     * extensionKey
     *
     * @var string $extensionKey
     */
    protected $extensionKey = '';

    /**
     * disableExtensions
     *
     * @param string $currentExtKey - last installed extension
     * @param \TYPO3\CMS\Extensionmanager\Utility\InstallUtility $customValue2
     * @return void
     */
    public function disableExtensions($currentExtKey = '', \TYPO3\CMS\Extensionmanager\Utility\InstallUtility $customValue2 = null) {
        $this->extensionKey = 'typo3themeskeleton';

        if($currentExtKey === $this->extensionKey) {
            $path = GeneralUtility::getFileAbsFileName('EXT:'.$this->extensionKey.'/ext_disable.php');

            if(file_exists($path)) {
                $extService = GeneralUtility::makeInstance(ExtService::class);
                $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
                $disableExtensions = include $path;

                foreach ($disableExtensions as $key => $value) {
                    if($extService->isAvailable($value)) {
                        $objectManager->get(InstallUtility::class)->uninstall($value);
                    }
                }
            }
        }
    }
}
