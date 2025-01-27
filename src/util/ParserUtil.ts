/**GenericsUtil script consists of all necessary code to parse a color into another format
 * @author  DeckerM7
 * @since   20220411
 */

import GenericsUtil from "./GenericsUtil.js";

class ParserUtil {
    /**
     * hex
     */
    static parseHexToRGBA = (hex) => {
        if (!GenericsUtil.isHexValue(hex)) return;

        let hexArray = GenericsUtil.__convertHexToArray(
            GenericsUtil.convertToHarmonizedHexValue(hex)
        );

        let rgba = hexArray.map((e) => parseInt(e, GenericsUtil.hex));

        if (rgba.length === GenericsUtil.validArrayLength[1])
            rgba[3] = rgba[3] / GenericsUtil.maxRGB;

        return rgba;
    };

    static parseHexToCMYK = (hex) => {
        if (!GenericsUtil.isHexValue(hex)) return;

        return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHexToRGBA(hex));
    };

    static parseHexToHSL = (hex) => {
        if (!GenericsUtil.isHexValue(hex)) return;

        return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHexToRGBA(hex));
    };

    static parseHexToHSV = (hex) => {
        if (!GenericsUtil.isHexValue(hex)) return;

        return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHexToRGBA(hex));
    };

    /**
     * rgba
     */
    static parseRGBAToHex = (r = 255, g = 255, b = 255, a = 1) => {
        let rgba = [r, g, b, a];

        if (!GenericsUtil.isRGBAArray(rgba)) return;
        rgba[3] *= GenericsUtil.maxRGB;

        let hex = rgba
            .map((e) => Math.round(e).toString(GenericsUtil.hex).padStart(2, "0"))
            .join("");

        return GenericsUtil.convertToHarmonizedHexValue(hex);
    };

    static parseRGBAToCMYK = (r = 255, g = 255, b = 255) => {
        let rgb = [r, g, b];
        if (!GenericsUtil.isRGBArray(rgb)) return;

        rgb = rgb.map((e) => GenericsUtil.normalizeRGBValue(e));

        if (Math.max(...rgb) === 0) return [0, 0, 0, 1];

        let k = 1 - Math.max(...rgb),
            c = (1 - rgb[0] - k) / (1 - k),
            m = (1 - rgb[1] - k) / (1 - k),
            y = (1 - rgb[2] - k) / (1 - k);

        return [c, m, y, k];
    };

    static parseRGBAToHSL = (r = 255, g = 255, b = 255) => {
        let rgb = [r, g, b];
        if (!GenericsUtil.isRGBArray(rgb)) return;

        let h = GenericsUtil.getHueFromRGBA(...rgb),
            s = GenericsUtil.getSaturationFromRGBA(...rgb),
            l = GenericsUtil.getLuminosityFromRGBA(...rgb);

        return [h, s, l];
    };

    static parseRGBAToHSV = (r = 255, g = 255, b = 255) => {
        let rgb = [r, g, b];
        if (!GenericsUtil.isRGBArray(rgb)) return;
        /**
         *
         let h = GenericsUtil.getHueFromRGBA(...rgb),
         s = GenericsUtil.getSaturationFromRGBA(...rgb),
         v = GenericsUtil.getValueFromRGBA(...rgb)
         return [h, s, v];
         */

        rgb = GenericsUtil.normalizeRGBArray(rgb);

        let cMax = Math.max(...rgb),
            cMin = Math.min(...rgb),
            delta = cMax - cMin;

        let h =
            delta === 0
                ? 0
                : cMax === rgb[0]
                    ? GenericsUtil.standardHue * (((rgb[1] - rgb[2]) / delta) % 6)
                    : cMax === rgb[1]
                        ? GenericsUtil.standardHue * ((rgb[2] - rgb[0]) / delta + 2)
                        : GenericsUtil.standardHue * ((rgb[0] - rgb[1]) / delta + 4);
        h = h < 0 ? 360 + h : h > 360 ? h - 360 : h;
        let s = cMax === 0 ? 0 : delta / cMax;

        return [h, s, cMax];
    };

    /**
     * cmyk
     */
    static parseCMYKToHex = (c = 1, m = 1, y = 1, k = 1) => {
        let cmyk = [c, m, y, k];

        if (!GenericsUtil.isCMYKArray(cmyk)) return;

        return ParserUtil.parseRGBAToHex(...ParserUtil.parseCMYKToRGBA(...cmyk));
    };

    static parseCMYKToRGBA = (c = 1, m = 1, y = 1, k = 1) => {
        let cmyk = [c, m, y, k];
        if (!GenericsUtil.isCMYKArray(cmyk)) return;

        let r = GenericsUtil.maxRGB * (1 - cmyk[0]) * (1 - cmyk[3]),
            g = GenericsUtil.maxRGB * (1 - cmyk[1]) * (1 - cmyk[3]),
            b = GenericsUtil.maxRGB * (1 - cmyk[2]) * (1 - cmyk[3]);

        return [r, g, b, GenericsUtil.maxDecimalPercentage];
    };

    static parseCMYKToHSL = (c = 1, m = 1, y = 1, k = 1) => {
        let cmyk = [c, m, y, k];
        if (!GenericsUtil.isCMYKArray(cmyk)) return;

        return ParserUtil.parseRGBAToHSL(...ParserUtil.parseCMYKToRGBA(...cmyk));
    };

    static parseCMYKToHSV = (c = 1, m = 1, y = 1, k = 1) => {
        let cmyk = [c, m, y, k];
        if (!GenericsUtil.isCMYKArray(cmyk)) return;

        return ParserUtil.parseRGBAToHSV(...ParserUtil.parseCMYKToRGBA(...cmyk));
    };

    /**
     * hsl
     */
    static parseHSLToHex = (h = 60, s = 1, l = 1) => {
        let hsl = [h, s, l];
        if (!GenericsUtil.isHSLArray(hsl)) return;

        return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSLToRGBA(...hsl));
    };

    static parseHSLToRGBA = (h = 60, s = 1, l = 1) => {
        let hsl = [h, s, l];
        if (!GenericsUtil.isHSLArray(hsl)) return;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs(((h / GenericsUtil.standardHue) % 2) - 1)),
            m = l - c / 2;

        let rgba = ParserUtil.getRGBPerHue(c, x, m, hsl[0]).map((e) =>
            GenericsUtil.getValueFromNormalizedRGBValue(e)
        );

        rgba[3] = GenericsUtil.maxDecimalPercentage;
        return rgba;
    };

    static parseHSLToCMYK = (h = 60, s = 1, l = 1) => {
        let hsl = [h, s, l];
        if (!GenericsUtil.isHSLArray(hsl)) return;

        return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHSLToRGBA(...hsl));
    };

    static parseHSLToHSV = (h = 60, s = 1, l = 1) => {
        let hsl = [h, s, l];
        if (!GenericsUtil.isHSLArray(hsl)) return;

        return ParserUtil.parseRGBAToHSV(...ParserUtil.parseHSLToRGBA(...hsl));
    };

    /**
     * hsv
     */
    static parseHSVToHex = (h = 60, s = 1, v = 1) => {
        let hsv = [h, s, v];
        if (!GenericsUtil.isHSVArray(hsv)) return;

        return ParserUtil.parseRGBAToHex(...ParserUtil.parseHSVToRGBA(...hsv));
    };

    static parseHSVToRGBA = (h = 60, s = 1, v = 1) => {
        let hsv = [h, s, v];
        if (!GenericsUtil.isHSVArray(hsv)) return;

        let c = hsv[1] * hsv[2],
            x = c * (1 - Math.abs(((hsv[0] / GenericsUtil.standardHue) % 2) - 1)),
            m = hsv[2] - c;

        let rgba = ParserUtil.getRGBPerHue(c, x, m, hsv[0]).map((e) =>
            GenericsUtil.getValueFromNormalizedRGBValue(e)
        );

        rgba[3] = GenericsUtil.maxDecimalPercentage;

        return rgba;
    };

    static parseHSVToHSL = (h = 60, s = 1, v = 1) => {
        let hsv = [h, s, v];
        if (!GenericsUtil.isHSVArray(hsv)) return;

        return ParserUtil.parseRGBAToHSL(...ParserUtil.parseHSVToRGBA(...hsv));
    };

    static parseHSVToCMYK = (h = 60, s = 1, v = 1) => {
        let hsv = [h, s, v];
        if (!GenericsUtil.isHSVArray(hsv)) return;

        return ParserUtil.parseRGBAToCMYK(...ParserUtil.parseHSVToRGBA(...hsv));
    };

    /**
     * helpers
     */

    static getRGBPerHue = (c, x, m, h) => {
        let normalizedRBG;
        if ((h >= 0 && h < 60) || h === 360) {
            normalizedRBG = [c + m, x + m, m];
        } else if (h >= 60 && h < 120) {
            normalizedRBG = [x + m, c + m, m];
        } else if (h >= 120 && h < 180) {
            normalizedRBG = [m, c + m, x + m];
        } else if (h >= 180 && h < 240) {
            normalizedRBG = [m, x + m, c + m];
        } else if (h >= 240 && h < 300) {
            normalizedRBG = [x + m, m, c + m];
        } else if (h >= 300 && h < 360) {
            normalizedRBG = [c + m, m, x + m];
        } else {
            normalizedRBG = [0, 0, 0];
        }

        return normalizedRBG;
    };
}

export default ParserUtil;
