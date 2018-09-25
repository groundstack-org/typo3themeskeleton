<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = [
    'www.kroeswang.de' => [
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
                'blanksearch' => [
                    'keyValues' => [
                        'type' => 1981,
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
    'kanzleikroeswang.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
    'www.kanzleikroeswang.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
    'kroeswang.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
    'preview.kanzleikroeswang.de' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
    'www.kroeswang.localhost' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
    'kroeswang.localhost' => $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['www.kanzleikroeswang.de'],
];
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array_merge(
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'],
    $realurl_additional
);

$customChanges = [
    'www.kanzleikroeswang.de' => [
        'pagePath' => [
            'rootpage_id' => 1,
        ],
    ],

    // PREVIEW
    'preview.kanzleikroeswang.de' => [
        'pagePath' => [
            'rootpage_id' => 1
        ]
    ],

    // LOCALHOST
    'www.kroeswang.localhost' => [
        'pagePath' => [
            'rootpage_id' => 1
        ]
    ],
];
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array_replace_recursive(
    $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'],
    (array)$customChanges
);
