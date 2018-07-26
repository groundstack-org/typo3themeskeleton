<?php
namespace HauerHeinrich\Typo3ThemeSkeleton\Controller;

class HhBackendController extends \TYPO3\CMS\Backend\Controller\BackendController {

    public function __construct() {

        parent::__construct();
        $extensionname = "typo3themeskeleton";
        $path = \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($extensionname);

        $this->addCssFile('main', $path . '/Resources/Public/t3Backend/Css/main.css');

        $this->addJavascriptFile($path . '/Resources/Public/t3Backend/JavaScript/load.js');
        $this->addJavascriptFile($path . '/Resources/Public/t3Backend/JavaScript/bemain.js');
    }
}
