<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {
    $extensionname = "hhthemekroeswang";

    // Typo3 extension manager gearwheel icon (ext_conf_template.txt)
    $_extConfig = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$extensionname]);
    $rtePresets = $_extConfig['rtePresets'];

    // Register own rte ckeditor config
    $GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['rte_hauerheinrich'] = $rtePresets;

    // register svg icons: identifier and filename
    $iconsPng = [
        // BackendLayouts
        'hh_one_column' => 'BackendIcons/header-1col.png',
        'hh_navaside_left' => 'BackendIcons/header-sidenav-left.png',

        // Gridelements
        'hh_grid_1_column' => 'gridelements/1_column.png',
        'hh_grid_2_column' => 'gridelements/2_column.png',
        'hh_grid_3_column' => 'gridelements/3_column.png',
        'hh_grid_4_column' => 'gridelements/4_column.png',
        'hh_grid_25-75_column' => 'gridelements/25-75.png',
        'hh_grid_33-66_column' => 'gridelements/33-66.png',
        'hh_grid_66-33_column' => 'gridelements/66-33.png',
        'hh_grid_75-25_column' => 'gridelements/75-25.png',
        'hh_grid_slider' => 'gridelements/slider.png',
        'hh_grid_tabs' => 'gridelements/tabs.png'
    ];

    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \TYPO3\CMS\Core\Imaging\IconRegistry::class
    );

    foreach ($iconsPng as $identifier => $path) {
        $iconRegistry->registerIcon(
            $identifier,
            \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
            ['source' => "EXT:{$extensionname}/Resources/Public/Images/{$path}"]
        );
    };

    // Add UserTS config as default for all BE users
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('
        ### https://docs.typo3.org/typo3cms/TSconfigReference/UserTsconfig/Options.html
        options {
            clearCache.pages = 1
            folderTree.uploadFieldsInLinkBrowser = 3
            pageTree.showDomainNameWithTitle = 1
            enableBookmarks = 0
        }

        admPanel {
            enable {
                all = 0
                preview = 1
                cache = 0
                publish = 0
                edit = 0
                tsdebug = 0
                info = 0
            }

            override {
                edit {
                    displayFieldIcons = 0
                    displayIcons = 0
                }
            }

            hide = 0
        }

        ### Show pageUID in the pagetree
        [adminUser = 1]
            options {
                pageTree.showPageIdWithTitle = 1
                folderTree.uploadFieldsInLinkBrowser = 3
            }
        [GLOBAL]
    ');

    // Hooks
    // Hook for Viewhelper "AddHeaderDataViewHelper"
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-postProcess'][] =
        HauerHeinrich\Hhthemekroeswang\Hooks\AddFooterData::class . '->addJSFooter';

    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-postProcess'][] =
        HauerHeinrich\Hhthemekroeswang\Hooks\AddHeaderData::class . '->addCSSHeader';

    // AJAX eID
    // $GLOBALS['TYPO3_CONF_VARS']['FE']['eID_include']['hhtheme'] = "EXT:{$extensionname}/Classes/EidApi/index.php";

    // Set paths of extension 'mask'
    $customChanges = [
        "EXT" => [
            "extConf" => [
                "mask" => serialize([
                    "json" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/mask.json",
                    "content" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Templates/",
                    "layouts" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Layouts/",
                    "partials" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Partials/",
                    "backend" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Backend/",
                    "layouts_backend" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Backend/Layouts/",
                    "partials_backend" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Backend/Partials/",
                    "preview" => "typo3conf/ext/{$extensionname}/Resources/Private/Extensions/mask/Preview/"
                ]),
            ]
        ]
    ];
    $GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive($GLOBALS['TYPO3_CONF_VARS'], $customChanges);
});
