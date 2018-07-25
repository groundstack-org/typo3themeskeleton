<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = [
    'www.typo3-theme-skeleton.de' => [
        'init' => [
            'enableCHashCache' => true,
            'respectSimulateStaticURLs' => 0,
            'appendMissingSlash' => 'ifNotFile,redirect',
            'adminJumpToBackend' => true,
            'enableUrlDecodeCache' => true,
            'enableUrlEncodeCache' => true,
            'emptyUrlReturnValue' => '/',
        ],
        'pagePath' => [
            'spaceCharacter' => '-',
            'languageGetVar' => 'L',
            'expireDays' => '3',
            'firstHitPathCache' => 1
        ],
        'fileName' => [
            'defaultToHTMLsuffixOnPrev' => 0,
            'acceptHTMLsuffix' => 1,
            'index' => [
                'print' => [
                    'keyValues' => [
                        'type' => 98,
                    ],
                ],
                'sitemap.xml' => [
                    'keyValues' => [
                        'type' => 5000,
                    ],
                ],
            ],
        ],
        'preVars' => [
            0 => [
                'GETvar' => 'L',
                'valueMap' => [
                    'de' => '0',
                    'en' => '1',
                ],
                'noMatch' => 'bypass',
                // 'valueDefault' => 'de',
            ],
        ],
        'fixedPostVars' =>[

        ],
        'postVarSets' => [
            '_DEFAULT' => [
                'news' => [
                    0 => [
                        'GETvar' => 'tx_news_pi1[news]',
                        'lookUpTable' => [
                            'table' => 'tx_news_domain_model_news',
                            'id_field' => 'uid',
                            'alias_field' => 'title',
                            'useUniqueCache' => 1,
                            'useUniqueCache_conf' => [
                                'strtolower' => 1,
                                'spaceCharacter' => '-',
                            ],
                        ],
                    ],
                ],
                'address' => [
                    0 => [
                        'GETvar' => 'tx_cyzaddress_address[action]',
                        'valueMap' => [
                            'show' => '',
                        ],
                        'noMatch' => 'bypass',
                    ],
                    1 => [
                        'GETvar' => 'tx_cyzaddress_address[address]',
                        'lookUpTable' => [
                            'table' => 'tt_address',
                            'id_field' => 'uid',
                            'alias_field' => 'name',
                            'useUniqueCache' => 1,
                            'useUniqueCache_conf' => [
                                'strtolower' => 1,
                                'spaceCharacter' => '-',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];

$realurl_additional = [
    'typo3-theme-skeleton.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.typo3-theme-skeleton.de'],
    'preview.typo3-theme-skeleton.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.typo3-theme-skeleton.de'],
    'www.typo3-theme-skeleton.localhost' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.typo3-theme-skeleton.de'],
    'typo3-theme-skeleton.localhost' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.typo3-theme-skeleton.de'],
];
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array_merge(
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'],
    $realurl_additional
);

$customChanges = [
    'www.typo3-theme-skeleton.de' => [
        'pagePath' => [
            'rootpage_id' => 1,
        ],
    ],

    // PREVIEW
    'preview.typo3-theme-skeleton.de' => [
        'pagePath' => [
            'rootpage_id' => 1
        ]
    ],

    // LOCALHOST
    'www.typo3-theme-skeleton.localhost' => [
        'pagePath' => [
            'rootpage_id' => 1
        ]
    ],
];
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array_replace_recursive(
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'],
    (array)$customChanges
);
