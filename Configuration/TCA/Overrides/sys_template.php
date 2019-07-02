<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    $extensionKey = "typo3themeskeleton";

    // make TypoScript selectable
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        $extensionKey,
        "Configuration/TypoScript",
        "EXT:{$extensionKey} :: Theme TS"
    );
});
