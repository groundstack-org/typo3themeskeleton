<?php
namespace HauerHeinrich\HhThemeSkeleton\Hooks;

// use \TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class AddHeaderData {

    /**
     *
     * @param array $params
     */
    public function addCSSHeader(array $params) {
        $cssContent = $GLOBALS['hhtheme']['cssHeaderData'];
        $cssContentWithoutStyle = str_replace("<style>", "", $cssContent);
        $cssContentWithoutStyle = str_replace("</style>", "", $cssContentWithoutStyle);
        $params['headerData']['9999'] = "<style>{$cssContentWithoutStyle}</style>";
    }
}
