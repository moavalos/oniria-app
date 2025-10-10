import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pill from "@/shared/components/Pill";

describe("Pill", () => {
  it("render the component correctly.", () => {
    const { container } = render(<Pill>Test Content</Pill>);
    expect(container.firstChild).toBeTruthy();
  });

  it("render the children content correctly", () => {
    render(<Pill>Hello World</Pill>);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("render multiple children elements", () => {
    render(
      <Pill>
        <span>Part 1</span>
        <span>Part 2</span>
      </Pill>
    );
    expect(screen.getByText("Part 1")).toBeTruthy();
    expect(screen.getByText("Part 2")).toBeTruthy();
  });

  it("render children with complex React elements", () => {
    render(
      <Pill>
        <strong>Bold</strong> and <em>Italic</em>
      </Pill>
    );
    expect(screen.getByText("Bold")).toBeTruthy();
    expect(screen.getByText("Italic")).toBeTruthy();
  });

  it("applies the correct style classes", () => {
    const { container } = render(<Pill>Test</Pill>);
    const pill = container.firstChild as HTMLElement;
    const className = pill.className;

    expect(className).toContain("rounded-full");
    expect(className).toContain("bg-fuchsia-700/50");
    expect(className).toContain("px-3");
    expect(className).toContain("py-1");
    expect(className).toContain("text-xs");
    expect(className).toContain("text-white/90");
    expect(className).toContain("border");
    expect(className).toContain("border-fuchsia-400/30");
  });

  it("applies the correct shadow class", () => {
    const { container } = render(<Pill>Test</Pill>);
    const pill = container.firstChild as HTMLElement;

    expect(
      pill.classList.contains("shadow-[0_0_10px_rgba(168,85,247,0.4)]")
    ).toBe(true);
  });

  it("renders as a div element", () => {
    const { container } = render(<Pill>Test</Pill>);
    const pill = container.firstChild as HTMLElement;

    expect(pill.tagName).toBe("DIV");
  });

  it("renders empty content without errors", () => {
    const { container } = render(<Pill children={undefined}></Pill>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders long text correctly", () => {
    const longText =
      "este es un texto muuuuuuy largo que deberia renderizarse sin problemass";
    render(<Pill>{longText}</Pill>);
    expect(screen.getByText(longText)).toBeTruthy();
  });

  it("renders numbers as children", () => {
    render(<Pill>{42}</Pill>);
    expect(screen.getByText("42")).toBeTruthy();
  });

  it("renders multiple pills without conflicts", () => {
    render(
      <>
        <Pill>holaa :3</Pill>
        <Pill>segundo</Pill>
        <Pill>quiero llorar</Pill>
      </>
    );
    expect(screen.getByText("holaa :3")).toBeTruthy();
    expect(screen.getByText("segundo")).toBeTruthy();
    expect(screen.getByText("quiero llorar")).toBeTruthy();
  });

  it("maintains the correct DOM structure", () => {
    const { container } = render(
      <Pill>Content that I put inside the Pill</Pill>
    );

    expect(container.children).toHaveLength(1);

    const pill = container.firstChild as HTMLElement;
    expect(pill.textContent).toBe("Content that I put inside the Pill");
  });
});
