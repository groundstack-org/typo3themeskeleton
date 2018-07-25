<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    $extensionname = "hhthemeskeleton";

    // make PageTsConfig selectable
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionname,
        "Configuration/PageTS/All.typoscript",
        "EXT:{$extensionname} :: Theme Page TS"
    );

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionname,
        "Configuration/PageTS/BackendLayoutFooter.typoscript",
        "EXT:{$extensionname} :: Theme Page TS - special for footer / end of page"
    );
});
