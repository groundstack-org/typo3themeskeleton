<?php
namespace GroundStack\HhThemeSkeleton\ViewHelpers;

/***************************************************************
 * Copyright notice
 *
 * (c) 2018 Christian Hackl <hackl.chris@googlemail.com>
 * All rights reserved
 *
 * This script is part of the TYPO3 project. The TYPO3 project is
 * free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * The GNU General Public License can be found at
 * http://www.gnu.org/copyleft/gpl.html.
 *
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * This copyright notice MUST APPEAR in all copies of the script!
 * Example
 * <html xmlns:f="http://typo3.org/ns/TYPO3/CMS/Fluid/ViewHelpers"
 *   xmlns:hh="http://typo3.org/ns/VENDOR/NAMESPACE/ViewHelpers"
 *   data-namespace-typo3-fluid="true">
 *
 *  <hh:readFromFlexform flexform="{data.pi_flexform}">
 *  or
 *  <hh:readFromFlexform flexform="{data.pi_flexform}" field="header" sheet="sDEF" lang="lDEF" value="vDEF">
 */

// use \TYPO3\CMS\Extbase\Utility\DebuggerUtility;
use \TYPO3\CMS\Core\Utility\GeneralUtility;

class ReadFromFlexformViewhelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper {
    public function initializeArguments() {
        $this->registerArgument('flexform', 'string', 'xml flexform', true);
        $this->registerArgument('field', 'string', 'xml flexform field', true);
        $this->registerArgument('sheet', 'string', 'like sDEF', false);
        $this->registerArgument('lang', 'string', 'like lDEF', false);
        $this->registerArgument('value', 'string', 'like vDEF', false);
    }

    /**
     *
     * @param string $tag
     */
    public function render() {
        $flexformArray = GeneralUtility::xml2array($this->arguments['flexform']);
        $abstractPlugin = new \TYPO3\CMS\Frontend\Plugin\AbstractPlugin();

        // https://api.typo3.org/typo3cms/8/html/class_t_y_p_o3_1_1_c_m_s_1_1_frontend_1_1_plugin_1_1_abstract_plugin.html#a28dce93387120cbe95320dca7e4842b7
        $fieldName = $this->arguments['field'];
        $sheet = $this->arguments['sheet'] ? $this->arguments['sheet'] : 'sDEF';
        $lang = $this->arguments['lang'] ? $this->arguments['lang'] : 'lDEF';
        $value = $this->arguments['value'] ? $this->arguments['value'] : 'vDEF';
        return $abstractPlugin->pi_getFFvalue($flexformArray, $fieldName, $sheet, $lang, $value);
    }
}
