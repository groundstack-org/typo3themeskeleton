<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    $extensionKey = "typo3themeskeleton";

    // make PageTsConfig selectable
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionKey,
        "Configuration/TsConfig/AllPage.typoscript",
        "EXT:{$extensionKey} :: Theme Page TS"
    );
});
