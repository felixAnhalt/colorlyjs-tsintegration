/**
 * Unit Tests for the CSS Util
 *
 * @author  deckerdent
 * @since   20221604
 */
import ColorFactory from "../src/ColorFactory";

const initialTestColorParam = ["css", "rgb(50, 169, 82)"];

describe("new Color('50, 169, 82')", () => {
  let color = ColorFactory.createColor(...initialTestColorParam);

  test("", () => {
    expect(color.getRed()).toBeCloseTo(50, 1);
  });

  test("", () => {
    expect(color.getGreen()).toBeCloseTo(169, 0);
  });

  test("", () => {
    expect(color.getBlue()).toBeCloseTo(82, 1);
  });

  test("", () => {
    expect(color.getCyan()).toBeCloseTo(0.7, 1);
  });

  test("", () => {
    expect(color.getYellow()).toBeCloseTo(0, 2);
  });

  test("", () => {
    expect(color.getMagenta()).toBeCloseTo(0.51, 2);
  });

  test("", () => {
    expect(color.getBlack()).toBeCloseTo(0.34, 2);
  });

  test("", () => {
    expect(color.getHue()).toBeCloseTo(136, 0);
  });

  test("", () => {
    expect(color.getSaturation()).toBeCloseTo(0.54, 2);
  });

  test("", () => {
    expect(color.getLightness()).toBeCloseTo(0.43, 2);
  });

  test("", () => {
    expect(color.getValue()).toBeCloseTo(0.66, 2);
  });

  test("", () => {
    expect(color.getDecimalOpacity()).toBeCloseTo(1, 1);
  });

  test("", () => {
    color.addRed(25);
    expect(color.getRed()).toBeCloseTo(75);
  });

  test("", () => {
    color.addGreen(color.getGreen()); // = 338 should defalut to 255
    expect(color.getGreen()).toBeCloseTo(255);
  });

  test("", () => {
    color.addBlue(-2);
    expect(color.getBlue()).toBeCloseTo(80);
  });

  test("", () => {
    color.addCyan(-0.7);
    expect(color.getRed()).toBeCloseTo(255);
  });

  test("", () => {
    expect(color.getGreen()).toBeCloseTo(255);
  });

  test("", () => {
    expect(color.getBlue()).toBeCloseTo(79);
  });

  test("", () => {
    color.addYellow(0.1);
    expect(color.getRed()).toBeCloseTo(255);
  });

  test("", () => {
    expect(color.getGreen()).toBeCloseTo(255);
  });

  test("", () => {
    expect(color.getBlue()).toBeCloseTo(54);
  });

  test("", () => {
    color.addMagenta(0.3);
    expect(color.getRed()).toBeCloseTo(255);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(178);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(54);
  });

  test("", () => {
    color.addHue(60);
    expect(color.getRed()).toBeCloseTo(131);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(255);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(54);
  });

  test("", () => {
    color.addSaturation(-0.5);
    expect(color.getRed()).toBeCloseTo(144);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(205);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(106);
  });

  test("", () => {
    color.addLightness(0.2);
    expect(color.getRed()).toBeCloseTo(201);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(231);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(182);
  });

  test("", () => {
    color.addValue(-0.1);
    expect(color.getRed()).toBeCloseTo(180);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(207);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(163);
  });

  test("", () => {
    color.addIntOpacity(-2);
    expect(color.getDecimalOpacity()).toBeCloseTo(0);
  });

  test("", () => {
    color.addBlack(2); // max is 1 so should default to 1
    expect(color.getRed()).toBeCloseTo(0);
  });
  test("", () => {
    expect(color.getGreen()).toBeCloseTo(0);
  });
  test("", () => {
    expect(color.getBlue()).toBeCloseTo(0);
  });

  test("", () => {
    expect(color.toHexIntValue()).toBeCloseTo(0);
  });
  test("", () => {
    expect(color.toHexArray()).toStrictEqual([0, 0, 0, 0]);
  });
  test("", () => {
    expect(color.toHexCSSString()).toBe("#000000");
  });
  test("", () => {
    expect(color.toRGBArray()).toStrictEqual([0, 0, 0]);
  });
  test("", () => {
    expect(color.toRGBAArray()).toStrictEqual([0, 0, 0, 0]);
  });
  test("", () => {
    expect(color.toRGBCSSString()).toBe("rgb(0, 0, 0)");
  });
  test("", () => {
    expect(color.toRGBACSSString()).toBe("rgba(0, 0, 0, 0)");
  });
  test("", () => {
    expect(color.toCMYKArray()).toStrictEqual([0, 0, 0, 1]);
  });
  test("", () => {
    expect(color.toCMYKCSSString()).toBe("cmyk(0, 0, 0, 0)");
  });
  test("", () => {
    expect(color.toHSLArray()).toStrictEqual([0, 0, 0]);
  });
  test("", () => {
    expect(color.toHSLCSSString()).toBe("hsl(0, 0, 0,)");
  });
  test("", () => {
    expect(color.toHSVArray()).toStrictEqual([0, 0, 0]);
  });
  test("", () => {
    expect(color.toHSVCSSString()).toBe("hsv(0, 0, 0,)");
  });
});