<?php
namespace HauerHeinrich\HhThemeSkeleton\Hooks;

// use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

use TYPO3\CMS\Backend\Controller\BackendController;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * This class adds Filelist related JavaScript to the backend
 */
class BackendControllerHook {

    /**
     * Adds Filelist Css used e.g. by context menu
     *
     * @param array $configuration
     * @param BackendController $backendController
     */
    public function addCss(array $configuration, BackendController $backendController) {
        $extensionname = "hhthemeskeleton";
        $path = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($extensionname);

        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->addCssFile($path . '/Resources/Public/t3Backend/Css/main.css');
    }

    /**
     * Adds Filelist JavaScript used e.g. by context menu
     *
     * @param array $configuration
     * @param BackendController $backendController
     */
    public function addJavaScript(array $configuration, BackendController $backendController) {
        $extensionname = "hhintranet";
        $path = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($extensionname);

        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->addJsFile($path . '/Resources/Public/t3Backend/JavaScript/bemain.js');
    }
}
