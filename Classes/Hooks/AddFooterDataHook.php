<?php
namespace HauerHeinrich\Typo3ThemeSkeleton\Hooks;

// use \TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class AddFooterData {

    /**
     *
     * @param array $params
     */
    public function addJSFooter(array $params) {
        $jsContent = $GLOBALS['hhtheme']['jsFooterData'];
        $jsContentWithoutScript = str_replace("<script>", "", $jsContent);
        $jsContentWithoutScript = str_replace("</script>", "", $jsContentWithoutScript);
        $params['footerData']['9999'] = "<script>{$jsContentWithoutScript}</script>";
    }
}
