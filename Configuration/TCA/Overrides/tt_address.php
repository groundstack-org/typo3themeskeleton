<?php
defined('TYPO3_MODE') || die();

call_user_func(function() {

    // START: Add RTE to description field
    $GLOBALS['TCA']['tt_address']['columns']['description']['config'] = $GLOBALS['TCA']['tt_content']['columns']['bodytext']['config'];

    $GLOBALS['TCA']['tt_address']['types']['0']['showitem'] = str_replace(
        'description',
        'description;;;richtext:rte_transform[flag=rte_enabled|mode=ts_css]',
        $GLOBALS['TCA']['tt_address']['types']['0']['showitem']
    );
    // END: Add RTE to description field
});
