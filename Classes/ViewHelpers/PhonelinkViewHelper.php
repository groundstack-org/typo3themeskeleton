<?php
namespace GroundStack\Typo3ThemeSkeleton\ViewHelpers;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;

/**
 * ViewHelper to render a phone link
 *
 * # Example: Basic example
 * $countrycode = 49;
 * $areacode = 851;
 *
 * <code>
 * <hh:phonelink number="56 8432 5" title="my title" class="phone" />
 * </code>
 *
 * <output>
 * <a class="phone" href="+498515684325" title="my title">56 8432 5</a>
 * </output>
 *
 */

class PhonelinkViewHelper extends AbstractViewHelper {

    /**
     * As this ViewHelper renders HTML, the output must not be escaped.
     *
     * @var bool
     */
    protected $escapeOutput = false;

    public function initializeArguments() {
        $this->registerArgument('number', 'string', 'phone number', true);
        $this->registerArgument('title', 'string', 'title-tag', false);
        $this->registerArgument('class', 'string', 'class', false);
        $this->registerArgument('countrycode', 'string', 'countrycode', false);
        $this->registerArgument('areacode', 'string', 'areacode', false);
    }

    /**
     *
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return mixed
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext) {
        $title = $arguments['title'] ? $arguments['title'] : "Reachable by phone at: {$arguments['number']}";
        $class = $arguments['class'] ? $arguments['class'] : "";

        return "<a ".self::setCSSClass($class)." href='tel:"
            . self::format_telephone_number_rfc3966($arguments['number'], $arguments['countrycode'], $arguments['areacode'])
            . "' title='{$title}' itemprop='telephone'>{$arguments['number']}</a>";
    }

    /**
     *
     * @param string $class : CSS class name
     *
     * @return string class="classname"
     *
     */
    static function setCSSClass($class) {
        if($class) {
            return "class='{$class}'";
        }
    }

    /**
     * Convert a telephone number into a full-featured RFC 3966 telephone number
     *
     * @param string $number : telephone number
     * @param string $countrycode : default country code, "49" for Germany
     * @param string $areacode : default area code, without leading zero
     *
     * @return string Full RFC 3966-compatible telephone number
     *
     * @author Christian Hackl <hackl.chris@googlemail.com>
     * originalCode Christian Weiske <cweiske@cweiske.de> // was written for the old tt_address extension
     */
    static function format_telephone_number_rfc3966($number, $countrycode = false, $areacode = false) {
        $countrycode = $countrycode ? $countrycode : "49"; // Germany
        $areacode = $areacode ? $areacode : "851"; // City Passau

        $num = preg_replace('#[^+0-9]#', '', $number);
        if (substr($num, 0, 1) === '+') {
            //full telephone number
            $tel = $num;
        } else if (substr($num, 0, 2) === '00') {
            //full number with country code, but 00 instead of +
            $tel = '+' . substr($num, 2);
        } else if (substr($num, 0, 1) === '0') {
            //full number without country code
            $tel = '+' . $countrycode . substr($num, 1);
        } else {
        //partial number, no country or area code
            $tel = '+' . $countrycode . $areacode . $num;
        }

        return $tel;
    }
}
