<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {
    $extension = "hhthemekroeswang";
    $extensionName = strtolower(\TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToUpperCamelCase($extension));
    // $pluginName = strtolower('PluginName');
    // $pluginSignature = $extensionName.'_'.$pluginName;

    // Disable language copy for auto translated content
    $TCA['tt_content']['columns']['header']['l10n_mode'] = '';
    $TCA['tt_content']['columns']['bodytext']['l10n_mode'] = '';

    // Set image cropVariants
    $GLOBALS['TCA']['sys_file_reference']['columns']['crop']['config'] = [
        'type' => 'imageManipulation',
        'cropVariants' => [
            'default' => [
                'title' => 'Default',
                'allowedAspectRatios' => [
                'NaN' => [
                    'title' => 'FREI',
                    'value' => 0.0
                ],
                'first' => [
                    'title' => '16 : 9',
                    'value' => 16 / 9
                ],
                ],
                'selectedRatio' => 'NaN',
            ],
            'smartphone' => [
                'title' => 'Smartphone variant',
                'allowedAspectRatios' => [
                    'NaN' => [
                        'title' => 'FREI',
                        'value' => 0.0
                    ],
                    'first' => [
                        'title' => '4 : 3',
                        'value' => 4 / 3
                    ],
                ],
                'selectedRatio' => 'first',
            ],
        ],
    ];
});
