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
 *  <hh:MetaTag type="title">
 *  or
 *  <hh:MetaTag type="title" string="my new title">
 */

 /** under DEVELOPMENT */

use TYPO3\CMS\Extbase\Utility\DebuggerUtility;
use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class MetaTagViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper {
    public function initializeArguments() {
        $this->registerArgument('type', 'string', 'title', true);
        $this->registerArgument('string', 'string', 'New title string', false);
    }

    /**
     * Simple Fluid Viewhelper to add data to the html header tag
     * @param string $tag
     */
    public function render() {
        $pageRender = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        $metaTagManager = GeneralUtility::makeInstance(MetaTagManagerRegistry::class);

        switch ($this->arguments['type']) {
            case 'title':
                $pageRender->setTitle($this->arguments['string']);
                DebuggerUtility::var_dump($metaTagManager->getAllManagers());
                break;
            case 'ogTitle':
                $metaTagManager->getManagerForProperty('og:title');
                $metaTagManager->addProperty('og:title', $this->arguments['string']);
                break;
            default:
                $GLOBALS['TSFE']->additionalFooterData[] = "<div class='error'>ERROR: no or wrong tag in AddHeaderDataViewHelper</div>";
                break;
        }
    }
}
