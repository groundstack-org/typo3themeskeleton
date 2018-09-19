<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    $extensionname = "hhthemekroeswang";

    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        $extensionname,
        'Configuration/TypoScript',
        'Hauer-Heinrich Theme Skeleton'
    );
});
