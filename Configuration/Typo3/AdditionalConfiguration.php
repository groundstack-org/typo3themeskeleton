<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

$databaseCredentialsFile = PATH_site . './../typo3_config/typo3_domain.php';
if (file_exists($databaseCredentialsFile)) { require_once ($databaseCredentialsFile); }

// Production / Live:
$customChanges = [
    'BE' => [
        'compressionLevel' => '0',
        'lockSSL' => 1,
        'versionNumberInFilename' => 0,
        'RTE_imageStorageDir' => 'fileadmin/uploads_rte/',
        'lockIP' => 4 // DSGVO / GDPR
    ],
    'FE' => [
        'compressionLevel' => '0',
        'noPHPscriptInclude' => '1',
        'pageNotFound_handling' => '404.html',
        'pageUnavailable_handling' => '503.html',
        'disableNoCacheParameter' => 1,
        'hidePagesIfNotTranslatedByDefault' => 1
    ],
    'EXT' => [
        'extConf' => [
        ]
    ],
    'SYS' => [
        'UTF8filesystem' => 1,
        'clearCacheSystem' => 1,
        'enableDeprecationLog' => 0,
        'phpTimeZone' => 'Europe/Berlin',
        'systemLocale' => 'de_DE.UTF-8',
        'ipAnonymization' => '2'
    ]
];
$GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customChanges);

// Special for windows systems
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $customWindows = [
        'SYS' => [
            'systemLocale' => 'de-de',
        ]
    ];
    $GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customWindows);
}

// Developement:
if(\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()->isDevelopment()) {
    $databaseCredentialsFile = PATH_site . './../typo3_config/typo3_domain_preview.php';
    if (file_exists($databaseCredentialsFile)) { require_once ($databaseCredentialsFile); }

    $customDevelopmentChanges = [
        'BE' => [
            'compressionLevel' => '0',
            'lockSSL' => 0,
            'versionNumberInFilename' => 0,
            'debug' => 1
        ],
        'FE' => [
            'compressionLevel' => '0',
            'debug' => 1,
            'noPHPscriptInclude' => 1,
            'disableNoCacheParameter' => 0
        ],
        'EXT' => [
            'extConf' => [
            ]
        ],
        'SYS' => [
            'displayErrors' => 1,
            'sqlDebug' => 1,
            'systemLog' => 'error_log',
            'systemLogLevel' => '2',
            'enableDeprecationLog' => 'file',
            // disable Caching: https://usetypo3.com/did-you-know.html
            'caching' => [
                'cacheConfigurations' => [
                    'cache_core' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_hash' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_pages' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_pagesection' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_phpcode' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_runtime' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\TransientMemoryBackend::class
                    ],
                    'cache_rootline' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'cache_imagesizes' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'l10n' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'extbase_object' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'extbase_reflection' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ],
                    'extbase_datamapfactory_datamap' => [
                        'backend' => \TYPO3\CMS\Core\Cache\Backend\NullBackend::class
                    ]
                ]
            ]
        ]
    ];

    $GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customDevelopmentChanges);
}
