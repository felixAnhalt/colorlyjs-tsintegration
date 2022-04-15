/**
 * @author DeckerM7
 * @since 20220414
 *
 */
import GenericsUtil from "./util/GenericsUtil";
import ParserUtil from "./util/ParserUtil";
import CSSUtil from "./util/CSSUtil";
import CSSColors from "./util/CSSColors";

import Color from "./model/Color";

class ColorFactory {
  //using variables
  //hex
  static createColorFromHex = (hex) => {
    if (!GenericsUtil.isHexValue(hex)) return;
    let rgba = ParserUtil.parseHexToRGBA(
      GenericsUtil.convertToHarmonizedHexValue(hex)
    );
    return new Color(...rgba);
  };

  //rgba
  static createColorFromRGB = (r, g, b) => {
    if (!GenericsUtil.isRGBArray([r, g, b])) return;
    return new Color(r, g, b);
  };

  static createColorFromRGBA = (r, g, b, a) => {
    if (!GenericsUtil.isRGBAArray([r, g, b, a])) return;
    return new Color(r, g, b, a);
  };

  //cymk
  static createColorFromCYMK = (c, y, m, k) => {
    if (!GenericsUtil.isCYMKArray([c, y, m, k])) return;
    return new Color(...ParserUtil.parseCYMKToRGBA(c, y, m, k));
  };

  //hsl
  static createColorFromHSL = (h, s, l) => {
    if (!GenericsUtil.isHSLArray([h, s, l])) return;
    return new Color(...ParserUtil.parseHSLToRGB(h, s, l));
  };

  //hsv
  static createColorFromHSV = (h, s, v) => {
    if (!GenericsUtil.isHSVArray([h, s, v])) return;
    return new Color(ParserUtil.parseHSVToRGBA(h, s, v));
  };

  //using css strings
  //hex
  static createColorFromHexCSSString = (cssStr) => {
    let hex = CSSUtil.cssStringToHarmonizedHexString(cssStr);

    return hex ? ColorFactory.createColorFromHex(hex) : undefined;
  };

  //rgba
  static createColorFromRGBCSSString = (cssStr) => {
    let rgb = CSSUtil.cssStringToRGBArray(cssStr);

    return rgb ? ColorFactory.createColorFromRGB(...rgb) : undefined;
  };
  static createColorFromRGBACSSString = (cssStr) => {
    let rgba = CSSUtil.cssStringToRGBAArray(cssStr);
    return rgba ? ColorFactory.createColorFromRGBA(...rgba) : undefined;
  };

  //cymk
  static createColorFromCYMKCSSString = (cssStr) => {
    let cymk = CSSUtil.cssStringToCYMKArray(cssStr);
    return cymk ? ColorFactory.createColorFromCYMK(...cymk) : undefined;
  };

  //hsl
  static createColorFromHSLCSSString = (cssStr) => {
    let hsl = CSSUtil.cssStringToHSLArray(cssStr);
    return hsl ? ColorFactory.createColorFromHSL(...hsl) : undefined;
  };

  //hsv
  static createColorFromHSVCSSString = (cssStr) => {
    let hsv = CSSUtil.cssStringToHSVArray(cssStr);
    return hsv ? ColorFactory.createColorFromHSV(...hsv) : undefined;
  };

  //using css color names
  static createColorFromNamedCSSColor = (colorName) => {
    if (!CSSColors[colorName]) return;
    return ColorFactory.createColorFromHexCSSString(CSSColors[colorName]);
  };
}

export default ColorFactory;