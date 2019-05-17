<?php
namespace GroundStack\Typo3ThemeSkeleton\Hooks;

// use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

use TYPO3\CMS\Backend\Controller\BackendController;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * This class adds Filelist related JavaScript to the backend
 */
class BackendControllerHook {

    /**
     * @var string
     */
    protected $extensionKey;

    /**
     * @var string
     */
    protected $extensionPath;

    public function __construct() {
        $this->extensionKey = "typo3themeskeleton";
        $this->extensionPath = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($this->extensionKey);
    }

    /**
     * Adds Filelist Css used e.g. by context menu
     *
     * @param array $configuration
     * @param BackendController $backendController
     */
    public function addCss(array $configuration, BackendController $backendController) {
        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->addCssFile($this->extensionPath . "/Resources/Public/Css/Backend/main.min.css");
    }

    /**
     * Adds Filelist JavaScript used e.g. by context menu
     *
     * @param array $configuration
     * @param BackendController $backendController
     */
    public function addJavaScript(array $configuration, BackendController $backendController) {
        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->loadRequireJsModule("TYPO3/CMS/Typo3ThemeSkeleton/Backend/Bemain");
    }
}
