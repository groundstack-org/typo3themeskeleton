<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {
    // $extensionKey = "typo3themeskeleton";
    // $extensionName = strtolower(\TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToUpperCamelCase($extensionKey));
    // $pluginName = strtolower('PluginName');
    // $pluginSignature = $extensionName.'_'.$pluginName;

    // Disable language copy for auto translated content
    $TCA['tt_content']['columns']['header']['l10n_mode'] = '';
    $TCA['tt_content']['columns']['bodytext']['l10n_mode'] = '';
});
