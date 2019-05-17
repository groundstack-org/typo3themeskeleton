<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    $extensionname = "typo3themeskeleton";

    // make PageTsConfig selectable
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionname,
        "Configuration/TsConfig/AllPage.typoscript",
        "EXT:{$extensionname} :: Theme Page TS"
    );
});
