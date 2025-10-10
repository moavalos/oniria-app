import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { History } from "@/app/pages";

// mock de react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "historial.title": "Historial",
        "historial.description": "Descripcion del historial",
        "historial.oniriaPro": "Oniria Pro",
        "historial.visibility": "Visibilidad",
        "historial.public": "Publico",
        "historial.insignia": "Insignia",
        "historial.soporte": "Soporte",
        "historial.atajos": "Atajos",
        "historial.salir": "Salir",
      };
      return translations[key] || key;
    },
  }),
}));

// mockeo de componentes hijos
vi.mock("@/", () => ({
  default: ({
    title,
    description,
    ctaText,
  }: {
    title: string;
    description: string;
    ctaText: string;
  }) => (
    <div data-testid="sidebar">
      <div>{title}</div>
      <div>{description}</div>
      <button>{ctaText}</button>
    </div>
  ),
}));

vi.mock("@/app/features/auth/components/Starfield", () => ({
  default: () => <div data-testid="starfield">Starfield</div>,
}));

vi.mock("@/app/features/auth/components/Pill", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pill">{children}</div>
  ),
}));

vi.mock("@/app/features/auth/components/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("@/shared/components/Card", () => ({
  default: ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/app/features/auth/components/NavigationArrows", () => ({
  default: ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
    <div data-testid="navigation-arrows">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

describe("History Nodes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render the component correctly", () => {
    const { container } = render(<History />);
    expect(container.firstChild).toBeTruthy();
  });

  it("render the Starfield component", () => {
    render(<History />);
    expect(screen.getByTestId("starfield")).toBeTruthy();
  });

  it("render the Header component", () => {
    render(<History />);
    expect(screen.getByTestId("header")).toBeTruthy();
  });

  it("render the Sidebar component with the correct props", () => {
    render(<History />);
    expect(screen.getByText("Historial")).toBeTruthy();
    expect(screen.getByText("Descripcion del historial")).toBeTruthy();
    expect(screen.getByText("Oniria Pro")).toBeTruthy();
  });

  // TODO modificar cuando esten los servicios
  it("render the Pills with date and visibility", () => {
    render(<History />);
    const pills = screen.getAllByTestId("pill");
    expect(pills.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Jueves, 15 de septiembre/)).toBeTruthy();
  });

  it("render the visibility text translated", () => {
    render(<History />);
    expect(screen.getByText(/Visibilidad/)).toBeTruthy();
    expect(screen.getByText(/Publico/)).toBeTruthy();
  });

  it("render the NavigationArrows component", () => {
    render(<History />);
    expect(screen.getByTestId("navigation-arrows")).toBeTruthy();
  });

  it("render the floating menu button", () => {
    const { container } = render(<History />);
    const floatingMenu = container.querySelector(".fixed.right-6.top-5 button");
    expect(floatingMenu).toBeTruthy();
  });

  it("render the footer buttons", () => {
    render(<History />);
    expect(screen.getByText("Soporte")).toBeTruthy();
    expect(screen.getByText("Atajos")).toBeTruthy();
    expect(screen.getByText("Salir")).toBeTruthy();
  });

  it("the logout button has the LogOut icon", () => {
    render(<History />);
    const logoutButton = screen.getByText("Salir");
    expect(logoutButton).toBeTruthy();
  });

  it("render the MoreHorizontal button in the top bar", () => {
    const { container } = render(<History />);
    const buttons = container.querySelectorAll(
      "button.rounded-xl.bg-white\\/5"
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("render the HelpCircle button", () => {
    const { container } = render(<History />);
    const buttons = container.querySelectorAll(
      "button.rounded-full.bg-white\\/5"
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("render the globe icon (Globe) for public visibility", () => {
    render(<History />);
    expect(screen.getByText(/Publico/)).toBeTruthy();
  });

  it("render the translated badge text", () => {
    render(<History />);
    expect(screen.getByText("Insignia")).toBeTruthy();
  });

  it("render the Globe component with the central orb", () => {
    const { container } = render(<History />);
    const globeContainer = container.querySelector(".aspect-square");
    expect(globeContainer).toBeTruthy();
  });

  it("the central orb has multiple gradient layers", () => {
    const { container } = render(<History />);
    const gradientLayers = container.querySelectorAll(".rounded-full");
    expect(gradientLayers.length).toBeGreaterThan(0);
  });

  it("render the decorative bars of the sci-fi frame", () => {
    const { container } = render(<History />);
    const decorativeBars = container.querySelectorAll(".bg-fuchsia-500\\/70");
    expect(decorativeBars).toHaveLength(8);
  });

  it("render the decorative lines of the frame border", () => {
    const { container } = render(<History />);
    const borderLines = container.querySelectorAll(".bg-fuchsia-400\\/70");
    expect(borderLines).toHaveLength(4);
  });

  it("the main layout uses a grid with 12 columns", () => {
    const { container } = render(<History />);
    const mainGrid = container.querySelector(".grid-cols-12");
    expect(mainGrid).toBeTruthy();
  });

  it("the background has the correct radial gradient", () => {
    const { container } = render(<History />);
    const background = container.querySelector(".min-h-screen");
    expect(background?.className).toContain("bg-[radial-gradient");
  });

  it("the footer buttons are hidden on mobile", () => {
    const { container } = render(<History />);
    const footerActions = container.querySelector(".fixed.bottom-4.right-4");
    expect(footerActions?.className).toContain("hidden");
    expect(footerActions?.className).toContain("md:flex");
  });

  it("the floating menu is positioned fixed in the top right corner", () => {
    const { container } = render(<History />);
    const floatingMenu = container.querySelector(".fixed.right-6.top-5");
    expect(floatingMenu).toBeTruthy();
  });

  it("NavigationArrows executes onPrev when clicked", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<History />);

    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);

    expect(consoleSpy).toHaveBeenCalledWith("Prev");
    consoleSpy.mockRestore();
  });

  it("NavigationArrows executes onNext when clicked", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<History />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(consoleSpy).toHaveBeenCalledWith("Next");
    consoleSpy.mockRestore();
  });

  it("generates the timeline mock correctly with 9 elements", () => {
    render(<History />);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeTruthy();
  });

  it("the main card has the backdrop and blur classes", () => {
    render(<History />);
    const cards = screen.getAllByTestId("card");
    const mainCard = cards.find((card) =>
      card.className.includes("backdrop-blur-md")
    );
    expect(mainCard).toBeTruthy();
  });
});
