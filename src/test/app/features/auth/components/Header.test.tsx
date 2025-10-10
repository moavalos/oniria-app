import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/shared/components/Header";

describe("Header", () => {
  it("render the component correctly", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeDefined();
  });

  it("shows the notification button", () => {
    render(<Header />);
    const bellButtons = screen.getAllByRole("button");
    const notificationButton = bellButtons.find((button) =>
      button.querySelector("svg")?.classList.contains("lucide-bell")
    );
    expect(notificationButton).toBeTruthy();
  });

  it("shows the user information on medium and large screens", () => {
    render(<Header />);
    expect(screen.getByText("Mora Avalos")).toBeTruthy();
    expect(screen.getByText("moraavalos@gmail.com")).toBeTruthy();
  });

  it("shows the user icon", () => {
    const { container } = render(<Header />);
    const userIcons = container.querySelectorAll(".lucide-user");
    expect(userIcons.length).toBeGreaterThan(0);
  });

  it("shows the chevron down icon", () => {
    const { container } = render(<Header />);
    const chevronIcons = container.querySelectorAll(".lucide-chevron-down");
    expect(chevronIcons.length).toBeGreaterThan(0);
  });

  it("has the mobile menu button with the class md:hidden", () => {
    render(<Header />);
    const menuButtons = screen.getAllByRole("button");
    const mobileMenuButton = menuButtons.find((button) =>
      button.querySelector("svg")?.classList.contains("lucide-menu")
    );
    expect(mobileMenuButton).toBeTruthy();
    expect(mobileMenuButton?.classList.contains("md:hidden")).toBe(true);
  });

  it("has the user container with the classes hidden md:flex", () => {
    const { container } = render(<Header />);
    const userContainer = container.querySelector(".hidden.md\\:flex");
    expect(userContainer).toBeTruthy();
    expect(userContainer?.classList.contains("hidden")).toBe(true);
    expect(userContainer?.classList.contains("md:flex")).toBe(true);
  });

  it("apply the correct style classes to the header", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.classList.contains("relative")).toBe(true);
    expect(header.classList.contains("z-12")).toBe(true);
    expect(header.classList.contains("flex")).toBe(true);
    expect(header.classList.contains("items-center")).toBe(true);
    expect(header.classList.contains("justify-between")).toBe(true);
    expect(header.classList.contains("border-b")).toBe(true);
    expect(header.classList.contains("border-white/10")).toBe(true);
  });

  it("has two main buttons (notifications and mobile menu)", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("has the correct style classes for the buttons", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button.classList.contains("rounded-full")).toBe(true);
      expect(button.classList.contains("bg-white/5")).toBe(true);
      expect(button.classList.contains("border-white/10")).toBe(true);
    });
  });

  it("shows the email with the correct font size", () => {
    render(<Header />);
    const email = screen.getByText("moraavalos@gmail.com");
    expect(email.classList.contains("text-[10px]")).toBe(true);
    expect(email.classList.contains("text-white/70")).toBe(true);
  });

  it("shows the name with the correct style", () => {
    render(<Header />);
    const name = screen.getByText("Mora Avalos");
    expect(name.classList.contains("text-xs")).toBe(true);
    expect(name.classList.contains("font-semibold")).toBe(true);
  });
});
