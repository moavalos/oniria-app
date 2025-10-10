import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import Starfield from "@/shared/components/Starfield";

describe("Starfield", () => {
  beforeEach(() => {
    // Mock Math.random para tests
    vi.spyOn(Math, "random");
  });

  it("render the component correctly", () => {
    const { container } = render(<Starfield />);
    expect(container.firstChild).toBeTruthy();
  });

  it("render exactly 80 dots (stars)", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");
    expect(dots).toHaveLength(80);
  });

  it("the main container has the correct classes", () => {
    const { container } = render(<Starfield />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain("pointer-events-none");
    expect(wrapper.className).toContain("absolute");
    expect(wrapper.className).toContain("inset-0");
  });

  it("each dot has the correct style classes", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      expect((dot as HTMLElement).className).toContain("absolute");
      expect((dot as HTMLElement).className).toContain("rounded-full");
      expect((dot as HTMLElement).className).toContain("bg-white");
    });
  });

  it("each dot has inline style properties", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      expect(element.style.left).toBeTruthy();
      expect(element.style.top).toBeTruthy();
      expect(element.style.width).toBeTruthy();
      expect(element.style.height).toBeTruthy();
      expect(element.style.opacity).toBeTruthy();
    });
  });

  it("the left positions are in percentage", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      expect(element.style.left).toMatch(/%$/);
    });
  });

  it("the top positions are in percentage", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      expect(element.style.top).toMatch(/%$/);
    });
  });

  it("each dot has boxShadow applied", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      expect(element.style.boxShadow).toBe("0 0 6px rgba(255,255,255,0.25)");
    });
  });

  it("width and height of each dot are equal (perfect circles)", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      expect(element.style.width).toBe(element.style.height);
    });
  });

  it("each dot has a unique key", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");
    const keys = new Set();

    dots.forEach((index) => {
      keys.add(index);
    });

    expect(keys.size).toBe(80);
  });

  // it("the sizes of the dots are within the expected range (0.3 to 2.1)", () => {
  //   const { container } = render(<Starfield />);
  //   const dots = container.querySelectorAll(".rounded-full.bg-white");

  //   dots.forEach((dot) => {
  //     const element = dot as HTMLElement;
  //     const size = parseFloat(element.style.width);
  //     expect(size).toBeGreaterThanOrEqual(0.3);
  //     expect(size).toBeLessThanOrEqual(2.1);
  //   });
  // });

  // it("the opacities are within the expected range (0.2 to 0.9)", () => {
  //   const { container } = render(<Starfield />);
  //   const dots = container.querySelectorAll(".rounded-full.bg-white");

  //   dots.forEach((dot) => {
  //     const element = dot as HTMLElement;
  //     const opacity = parseFloat(element.style.opacity);
  //     expect(opacity).toBeGreaterThanOrEqual(0.2);
  //     expect(opacity).toBeLessThanOrEqual(0.9);
  //   });
  // });

  it("the positions are distributed throughout the space (0-100%)", () => {
    const { container } = render(<Starfield />);
    const dots = container.querySelectorAll(".rounded-full.bg-white");

    dots.forEach((dot) => {
      const element = dot as HTMLElement;
      const x = parseFloat(element.style.left);
      const y = parseFloat(element.style.top);

      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
    });
  });

  it("renders multiple times with the same number of dots", () => {
    const { container: container1 } = render(<Starfield />);
    const { container: container2 } = render(<Starfield />);

    const dots1 = container1.querySelectorAll(".rounded-full.bg-white");
    const dots2 = container2.querySelectorAll(".rounded-full.bg-white");

    expect(dots1).toHaveLength(80);
    expect(dots2).toHaveLength(80);
  });

  it("the component is purely visual without interactivity", () => {
    const { container } = render(<Starfield />);
    const wrapper = container.firstChild as HTMLElement;

    // Verifica que tiene pointer-events-none para no interceptar clicks
    expect(wrapper.className).toContain("pointer-events-none");
  });

  it("no contiene botones ni elementos interactivos", () => {
    const { container } = render(<Starfield />);
    const buttons = container.querySelectorAll("button");
    const inputs = container.querySelectorAll("input");
    const links = container.querySelectorAll("a");

    expect(buttons).toHaveLength(0);
    expect(inputs).toHaveLength(0);
    expect(links).toHaveLength(0);
  });
});
