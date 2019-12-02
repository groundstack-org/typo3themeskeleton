<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

$databaseCredentialsFile = \TYPO3\CMS\Core\Core\Environment::getPublicPath() . '/../typo3_config/typo3_domain.php';
if (file_exists($databaseCredentialsFile)) { require_once ($databaseCredentialsFile); }

// FE - addRootLineFields
$rootLineField = empty($GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields']) ? "backend_layout" : ",backend_layout";
$GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] = $GLOBALS['TYPO3_CONF_VARS']['FE']['addRootLineFields'] . $rootLineField;

// Production / Live:
$customChanges = [
    'BE' => [
        'compressionLevel' => '0',
        'lockSSL' => 1,
        'versionNumberInFilename' => 0,
        'RTE_imageStorageDir' => 'fileadmin/uploads_rte/',
        'lockIP' => 4, // DSGVO / GDPR,
        // only if server has no argon2i
        // 'passwordHashing' => [
        //     'className' => 'TYPO3\\CMS\\Core\\Crypto\\PasswordHashing\\BcryptPasswordHash',
        //     'options' => [],
        // ]
    ],
    'FE' => [
        'compressionLevel' => '0',
        'noPHPscriptInclude' => '1',
        'pageNotFound_handling' => '404.html',
        'pageUnavailable_handling' => '503.html',
        'disableNoCacheParameter' => 1,
        'hidePagesIfNotTranslatedByDefault' => 1,
        // only if server has no argon2i
        // 'passwordHashing' => [
        //     'className' => 'TYPO3\\CMS\\Core\\Crypto\\PasswordHashing\\BcryptPasswordHash',
        //     'options' => [],
        // ]
    ],
    'EXT' => [
        'runtimeActivatedPackages' => [

        ],
        'extConf' => [
        ]
    ],
    'GFX' => [
        'processor_stripColorProfileByDefault' => true,
        'processor_stripColorProfileCommand' => '-strip -interlace Plane -quality 80',
        'jpg_quality' => 80
    ],
    'SYS' => [
        'UTF8filesystem' => 1,
        'clearCacheSystem' => 1,
        'enableDeprecationLog' => 0,
        'phpTimeZone' => 'Europe/Berlin',
        'systemLocale' => 'de_DE.UTF-8',
        'ipAnonymization' => '2',
        'simplifiedControllerActionDispatching' => true,
        'loginCopyrightWarrantyProvider' => 'www.hauer-heinrich.de',
        'systemLogLevel' => 3
    ]
];
$GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customChanges);

// Developement - Stage / Preview:
if(\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()->__toString() === 'Development/Server') {
    $databaseCredentialsFile = \TYPO3\CMS\Core\Core\Environment::getPublicPath() . '/../typo3_config/typo3_domain_preview.php';
    if (file_exists($databaseCredentialsFile)) { require_once ($databaseCredentialsFile); }
}

// Developement:
if(\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()->__toString() === 'Development') {
    $databaseCredentialsFile = \TYPO3\CMS\Core\Core\Environment::getPublicPath() . '/../typo3_config/typo3_domain_local.php';
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
        ]
    ];

    $GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customDevelopmentChanges);
}

// Disable All Caches (in Development Mode)
// (https://medium.com/typo3blog/disabling-typo3-caches-a137667848c9)
if(\TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext()->isDevelopment()) {
    foreach ($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations'] as $cacheName => $cacheConfiguration) {
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations'][$cacheName]['backend'] = \TYPO3\CMS\Core\Cache\Backend\NullBackend::class;
    }
}

// Special for windows systems
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $customWindows = [
        'SYS' => [
            'systemLocale' => 'de-de',
        ]
    ];
    $GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], (array)$customWindows);
}
