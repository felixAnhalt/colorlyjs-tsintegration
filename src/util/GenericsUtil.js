"use strict";
/**
 * @author DeckerM7
 * @since 20220411
 */
Object.defineProperty(exports, "__esModule", { value: true });
class GenericsUtil {
}
GenericsUtil.maxRGB = 255;
GenericsUtil.maxDecimalPercentage = 1;
GenericsUtil.maxIntPercentage = 100;
GenericsUtil.validArrayLength = [3, 4];
GenericsUtil.standardHue = 60;
GenericsUtil.maxHue = 360;
GenericsUtil.hex = 16;
GenericsUtil.hexPrefix = "#";
GenericsUtil.validHexLength = [3, 4, 6, 8];
GenericsUtil.hexNoTransparency = "FF";
GenericsUtil.zero = 0;
/**
 * hex
 */
/**
 * If the parameter provided is a eight digit hexadecimal value
 * the opacity value will be returned. If it's a shorter hexadecimal
 * value the 100% opacity value FF will be returned.
 * If the parameter is not a valid hexadecimal value undefined is returned.
 *
 * @param {*} param
 * @returns a two digit hexadecimal value as a string
 */
GenericsUtil.getHexTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    param = GenericsUtil.convertToHarmonizedHexValue(param);
    return GenericsUtil.isEigthDigitHexValue(param)
        ? GenericsUtil.__convertHexToArray(param)[3]
        : GenericsUtil.hexNoTransparency;
};
/**
 * converts a valid number or string into a standardised
 * hexadecimal equivalent
 * @param {*} param
 * @returns a hex string without leading #, uppercase
 */
GenericsUtil.convertToHarmonizedHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    param = GenericsUtil.__removeLeadingHashtag(param).toUpperCase();
    /*if (GenericsUtil.isThreeDigitHexValue(param))
      param = GenericsUtil.__fillThreeDigitHexString(param);*/
    return param;
};
/**
 * Converts a numeric value into a hexadecimal string
 * @param {*} param
 * @returns a hexadecimal string
 */
GenericsUtil.convertHexIntValueToString = (param) => {
    if (!GenericsUtil.__isNumeric(param))
        return;
    param = param.toString(GenericsUtil.hex).toUpperCase();
    return GenericsUtil.isHexString(param) ? param : undefined;
};
/**
 * Converts a hexadecimal string to a numeric value
 * @param {*} param
 * @returns a numeric value
 */
GenericsUtil.convertHexStringToIntValue = (param) => {
    if (!GenericsUtil.isHexString(param))
        return;
    return parseInt(GenericsUtil.__removeLeadingHashtag(param), GenericsUtil.hex);
};
/**
 * Checks if the given parameter is a valid hex value
 * valid hexValues are either strings in the following formats:
 * 1. eigth digits with values from 0-9 and a-f, case insensitive
 * 2. six digits with values from 0-9 and a-f, case insensitive
 * 3. three digits with values from 0-9 and a-f, case insensitive
 * 4. one of the above with a leading #
 * or numeric values whichs hex representation meets the requirements
 * above
 * @param {*} param
 * @returns
 */
GenericsUtil.isHexValue = (param) => {
    return GenericsUtil.isHexString(param) || GenericsUtil.isHexIntValue(param);
};
/**
 * Tests if the given numeric or string parameter is a three digit hex code
 * @param {*} param
 * @returns true if the param is representable by a three digit hex code
 */
GenericsUtil.isThreeDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return false;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    return (GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[0]).test(param) ||
        GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[0]).test(param));
};
/**
 * Tests if the given numeric or string parameter is a six digit hex code
 * @param {*} param
 * @returns true if the param is representable by a six digit hex code
 */
GenericsUtil.isSixDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return false;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    return (GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[2]).test(param) ||
        GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[2]).test(param));
};
/**
 * Tests if the given numeric or string parameter is a eight digit hex code
 * @param {*} param
 * @returns true if the param is representable by a eight digit hex code
 */
GenericsUtil.isEigthDigitHexValue = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return false;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    return (GenericsUtil.__getHexRegex(GenericsUtil.validHexLength[3]).test(param) ||
        GenericsUtil.__getHexRegexWithPrefix(GenericsUtil.validHexLength[3]).test(param));
};
/**
 * Tests a String for being a hex string
 * @param {*} param
 * @returns true if the given string matches the hex code requirements
 */
GenericsUtil.isHexString = (param) => {
    return (GenericsUtil.__isString(param) &&
        GenericsUtil.validHexLength.some((e) => GenericsUtil.__getHexRegex(e).test(param) ||
            GenericsUtil.__getHexRegexWithPrefix(e).test(param)));
};
/**
 * tests a numeric value for being a valid hex equivalent
 * @param {*} param
 * @returns true if the provided numeric value is valid hex
 */
GenericsUtil.isHexIntValue = (param) => {
    return (GenericsUtil.__isNumeric(param) &&
        GenericsUtil.isHexString(GenericsUtil.convertHexIntValueToString(param)));
};
/**
 * Tests a string or numeric value against the eight digit hex pattern
 * @param {*} param
 * @returns true if the given numeric or string hex value has transparency value
 */
GenericsUtil.isHexWithTransparency = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return false;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    return GenericsUtil.isEigthDigitHexValue(param);
};
/**
 * Converts a three digit hex string into a six digit hex string
 * @param {*} param
 * @returns a six digit equivalent hex string
 */
GenericsUtil.__fillThreeDigitHexString = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    if (!GenericsUtil.isThreeDigitHexValue(param))
        return param;
    return param
        .split(GenericsUtil.__getHexRegex(1))
        .map((e) => {
        return `${e}${e}`;
    })
        .join("");
};
/**
 * Converts a Hex Value to an array of 3 or 4 elements depending
 * on the lenght of the hex value. The Array represents hex encoded
 * RGB or RGBA. E.g.
 * ["A", "B", "C"] => for three digit hex values
 * ["AA", "BB", "CC"] => for 6 digit hex values
 * ["AA", "BB", "CC", "DD"] => for 8 digit hex values
 * @param {*} param
 * @returns an array
 */
GenericsUtil.__convertHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    if (GenericsUtil.isHexIntValue(param))
        param = GenericsUtil.convertHexIntValueToString(param);
    let conversionObjectLiteral = {
        3: GenericsUtil.__convertThreeDigitHexToArray,
        4: GenericsUtil.__convertThreeDigitHexToArray,
        6: GenericsUtil.__convertSixOrEightDigitHexToArray,
        8: GenericsUtil.__convertSixOrEightDigitHexToArray,
    };
    param = GenericsUtil.__removeLeadingHashtag(param);
    return conversionObjectLiteral[param.length](param);
};
GenericsUtil.__convertThreeDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    let arr = GenericsUtil.__splitHexString(param, 1);
    arr = arr.map((e) => `${e}${e}`);
    return arr;
};
GenericsUtil.__convertSixOrEightDigitHexToArray = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    return GenericsUtil.__splitHexString(param, 2);
};
GenericsUtil.__splitHexString = (hexString, digits) => {
    if (!GenericsUtil.isHexValue(hexString))
        return;
    return hexString.match(new RegExp(`[0-9a-fA-F]{${digits}}`, "gi"));
};
GenericsUtil.__removeLeadingHashtag = (param) => {
    if (!GenericsUtil.isHexValue(param))
        return;
    return param.replace(GenericsUtil.hexPrefix, "").toUpperCase();
};
/**
 * returns a regex for a hex color which is not prefixed with #
 * and as a certain amount of digits
 * @param {*} digits
 * @returns
 */
GenericsUtil.__getHexRegex = (digits) => {
    return new RegExp(`^[0-9a-fA-F]{${digits}}$`, "gi");
};
/**
 * returns a regex for a hex color which is prefixed with #
 * and as a certain amount of digits
 * @param {*} digits
 * @returns
 */
GenericsUtil.__getHexRegexWithPrefix = (digits) => {
    return new RegExp(`^${GenericsUtil.hexPrefix}[0-9a-fA-F]{${digits}}$`, "gi");
};
/**
 * rgba
 */
//calculations
GenericsUtil.getValueFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb))
        return;
    rgb = GenericsUtil.normalizeRGBArray(rgb);
    let v = Math.max(...rgb);
    return v;
};
GenericsUtil.getSaturationFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb))
        return;
    let l = GenericsUtil.getLuminosityFromRGBA(...rgb);
    rgb = GenericsUtil.normalizeRGBArray(rgb);
    if (Math.min(...rgb) === 1)
        return 1;
    if (l === 1 || Math.max(...rgb) === 0)
        return 0;
    return (Math.max(...rgb) - Math.min(...rgb)) / (1 - Math.abs(2 * l - 1));
};
GenericsUtil.getHueFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb))
        return;
    rgb = GenericsUtil.normalizeRGBArray(rgb);
    let h = GenericsUtil.standardHue;
    if (rgb[0] >= rgb[1] && rgb[1] >= rgb[2]) {
        h = h * ((rgb[1] - rgb[2]) / (rgb[0] - rgb[2]));
    }
    else if (rgb[1] > rgb[0] && rgb[0] >= rgb[2]) {
        h = h * (2 - (rgb[0] - rgb[2]) / (rgb[1] - rgb[2]));
    }
    else if (rgb[1] >= rgb[2] && rgb[2] > rgb[0]) {
        h = h * (2 + (rgb[2] - rgb[0]) / (rgb[1] - rgb[0]));
    }
    else if (rgb[2] > rgb[1] && rgb[1] > rgb[0]) {
        h = h * (4 - (rgb[1] - rgb[0]) / (rgb[2] - rgb[0]));
    }
    else if (rgb[2] > rgb[0] && rgb[0] >= rgb[1]) {
        h = h * (4 + (rgb[0] - rgb[1]) / (rgb[2] - rgb[1]));
    }
    else if (rgb[0] >= rgb[2] && rgb[2] > rgb[1]) {
        h = h * (6 - (rgb[2] - rgb[1]) / (rgb[0] - rgb[1]));
    }
    else {
        h = 0;
    }
    return h === null || isNaN(h) || h === undefined ? 0 : h;
};
GenericsUtil.getLuminosityFromRGBA = (r = 255, g = 255, b = 255) => {
    let rgb = [r, g, b];
    if (!GenericsUtil.isRGBArray(rgb))
        return;
    rgb = GenericsUtil.normalizeRGBArray(rgb);
    return 0.5 * (Math.max(...rgb) + Math.min(...rgb));
};
GenericsUtil.normalizeRGBArray = (param) => {
    if (!GenericsUtil.isRGBArray(param))
        return;
    return param.map((e) => GenericsUtil.normalizeRGBValue(e));
};
GenericsUtil.normalizeRGBAArray = (param) => {
    if (!GenericsUtil.isRGBAArray(param))
        return;
    return param.map((e, i) => i < GenericsUtil.validArrayLength[0]
        ? GenericsUtil.normalizeRGBValue(e)
        : e);
};
GenericsUtil.normalizeRGBValue = (param) => {
    if (!GenericsUtil.isRGBValue(param))
        return;
    return param / GenericsUtil.maxRGB;
};
GenericsUtil.getValueFromNormalizedRGBValue = (param) => {
    if (!GenericsUtil.isNormalizedRGBValue(param))
        return;
    return param * GenericsUtil.maxRGB;
};
// checkers
/**
 * Returns true if param is a number between 0 and 255
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isRGBValue = (param) => {
    return param <= GenericsUtil.maxRGB && param >= GenericsUtil.zero;
};
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isNormalizedRGBValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
};
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isRGBAAlphaValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
};
/**
 * Returns true if param is a three elements array with each element
 * being a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isRGBArray = (param) => {
    return (GenericsUtil.isThreeElementsArray(param) &&
        param.every((e) => GenericsUtil.isRGBValue(e)));
};
/**
 * Returns true if param is a four elements array with
 * elements 1 - 3 are numbers between 0 and 255
 * and element 4 is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isRGBAArray = (param) => {
    return (GenericsUtil.isFourElementsArray(param) &&
        param.every((e, i) => (i < GenericsUtil.validArrayLength[0] &&
            GenericsUtil.isRGBValue(e)) ||
            GenericsUtil.isRGBAAlphaValue(e)));
};
/**
 * cmyk
 */
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isCMYKValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
};
/**
 * Returns true if param is a three elements array with each element
 * being a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isCMYKArray = (param) => {
    return (GenericsUtil.isFourElementsArray(param) &&
        param.every((e) => GenericsUtil.isCMYKValue(e)));
};
/**
 * hsl
 */
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isHSLValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
};
/**
 * Returns true if param is a three elements array with each element
 * being a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isHSLArray = (param) => {
    return (GenericsUtil.isThreeElementsArray(param) &&
        param.every((e, i) => i === GenericsUtil.zero
            ? GenericsUtil.isHueValue(e)
            : GenericsUtil.isHSLValue(e)));
};
/**
 * hsv
 */
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isHSVValue = (param) => {
    return GenericsUtil.isDecimalPercentage(param);
};
GenericsUtil.isHueValue = (param) => {
    GenericsUtil.__isNumeric(param);
    return (GenericsUtil.__isNumeric(param) &&
        param >= GenericsUtil.zero &&
        param <= GenericsUtil.maxHue);
};
/**
 * Returns true if param is a three elements array with each element
 * being a number betwenn 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isHSVArray = (param) => {
    return (GenericsUtil.isThreeElementsArray(param) &&
        param.every((e, i) => i === GenericsUtil.zero
            ? GenericsUtil.isHueValue(e)
            : GenericsUtil.isHSVValue(e)));
};
/**
 * Generics
 */
/**
 *
 * @param {*} number
 * @param {*} precision
 * @returns
 */
GenericsUtil.roundNumberToInfinity = (number, precision) => {
    if (!GenericsUtil.__isNumeric(number))
        return;
    if (Number.isInteger(number))
        return number;
    if (precision === 0)
        return Math.ceil(number);
    let numberString = number.toFixed(precision + 3); // we need some more digits than the expected precision
    let [integer, decimalPoints] = numberString.split(".");
    decimalPoints = decimalPoints.replace(/0*$/gi, "");
    if (decimalPoints.length === 0)
        return parseInt(integer);
    if (decimalPoints.length <= precision)
        return parseFloat(`${integer}.${decimalPoints}`);
    let keptDecimalPoints = decimalPoints.substr(0, precision), removedDecimalPoints = decimalPoints.substr(precision, decimalPoints.length);
    let splitDecimalPoints = /[0-9]/gi;
    let keptArray = keptDecimalPoints
        .match(splitDecimalPoints)
        .map((e) => parseInt(e)), removedArray = removedDecimalPoints
        .match(splitDecimalPoints)
        .map((e) => parseInt(e));
    if ((/^5[0]*$/gi.test(removedDecimalPoints) &&
        keptArray[keptArray.length - 1] % 2 === 1) ||
        (removedArray[0] >= 5 &&
            removedArray.some((e, i) => (i === 0 ? false : e !== 0))))
        keptArray[keptArray.length - 1] = keptArray[keptArray.length - 1] + 1;
    return parseFloat(`${integer}.${keptArray.join("")}`);
};
/**
 * Returns true if param is a number between 0 and 1
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isDecimalPercentage = (param) => {
    return (GenericsUtil.__isNumeric(param) &&
        param <= GenericsUtil.maxDecimalPercentage &&
        param >= GenericsUtil.zero);
};
/**
 * Returns true if param is a number between 0 and 100
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isIntPercentage = (param) => {
    return (GenericsUtil.__isNumeric(param) &&
        param <= GenericsUtil.maxIntPercentage &&
        param >= GenericsUtil.zero);
};
/**
 * Returns true if param is an array or object with length four
 * @param {*} arr
 * @returns boolean
 */
GenericsUtil.isFourElementsArray = (arr) => {
    return (GenericsUtil.isObject(arr) &&
        arr.length === GenericsUtil.validArrayLength[1]);
};
/**
 * returns true if param is an array or object with length three
 * @param {*} arr
 * @returns boolean
 */
GenericsUtil.isThreeElementsArray = (arr) => {
    return (GenericsUtil.isObject(arr) &&
        arr.length === GenericsUtil.validArrayLength[0]);
};
/**
 * Returns true if param is a array or object
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isObject = (param) => {
    return typeof param === "object";
};
/**
 * Returns true if param is either a number or a string
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.isNumberOrString = (param) => {
    return GenericsUtil.__isNumeric(param) || GenericsUtil.____isString(param);
};
/**
 * Returns true if param is a number
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.__isNumeric = (param) => {
    return typeof param === "number";
};
/**
 * Returns true if param is a string
 * @param {*} param
 * @returns boolean
 */
GenericsUtil.__isString = (param) => {
    return typeof param === "string";
};
exports.default = GenericsUtil;
//# sourceMappingURL=GenericsUtil.js.map