import React from "react";

// Tipos para los diferentes componentes
type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
};

type CardRootProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// Componente Container (para cards madres/principales)
function CardContainer({
  children,
  className = "",
  scrollable = false,
}: CardContainerProps) {
  return (
    <div
      className={`rounded-2xl border border-white/20 overflow-hidden h-full
                  bg-gradient-to-b from-black/30 via-purple-800/50 to-purple-500/30 
                  backdrop-blur-md shadow-2xl text-left p-4 ${className} ${
        scrollable ? "pr-2" : ""
      }`}
    >
      <div
        className={`overflow-hidden w-full h-full ${
          scrollable ? "scrollbar overflow-y-scroll" : ""
        }`}
      >
        <div
          className={`w-full h-full flex flex-col gap-4 ${
            scrollable ? "pr-1" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Componente Root (para cards más pequeñas/secciones)
function CardRoot({ children, className = "", style = {} }: CardRootProps) {
  const defaultStyle = {
    backgroundColor: "var(--surface-subtle)",
    borderColor: "var(--border-subtle)",
    ...style,
  };

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${className}`}
      style={defaultStyle}
    >
      {children}
    </div>
  );
}

// Componente Title
function CardTitle({ children, className = "", style = {} }: CardTitleProps) {
  const defaultStyle = {
    color: "var(--text-80)",
    fontSize: "var(--card-tilte-size)",
    ...style,
  };

  return (
    <div
      className={`text-[13px] font-semibold mb-1 ${className}`}
      style={defaultStyle}
    >
      {children}
    </div>
  );
}

// Componente Description
function CardDescription({
  children,
  className = "",
  style = {},
}: CardDescriptionProps) {
  const defaultStyle = {
    color: "var(--color-text-muted)",
    ...style,
  };

  return (
    <div className={`text-[12px] mb-3${className}`} style={defaultStyle}>
      {children}
    </div>
  );
}

// Componente Body
function CardBody({ children, className = "", style = {} }: CardBodyProps) {
  return (
    <div className={`${className}`} style={style}>
      {children}
    </div>
  );
}

// Componente principal con compound pattern
const Card = Object.assign(CardContainer, {
  Container: CardContainer,
  Root: CardRoot,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
});

export default Card;
