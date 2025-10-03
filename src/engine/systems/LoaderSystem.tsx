import React, { useEffect, useState, useRef } from "react";
import { useProgress } from "../hooks/useProgress";

// Interfaces
export interface LoaderProps {
  progress: number;
  isLoading: boolean;
  error: string | null;
}

export interface LoaderSystemProps {
  customLoader?: React.ComponentType<LoaderProps>;
  showProgress?: boolean;
  timeout?: number;
  // Callbacks
  onLoadStart?: () => void;
  onLoadProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

// Loader por defecto
function DefaultLoader({ progress, isLoading, error }: LoaderProps) {
  // Solo mostrar si está cargando o hay error
  if (!isLoading && !error) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {error ? (
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "24px", marginBottom: "16px", color: "#ff6b6b" }}
          >
            ⚠️ Error de Carga
          </div>
          <div
            style={{ fontSize: "16px", marginBottom: "24px", color: "#ccc" }}
          >
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007AFF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          {/* Spinner */}
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(255, 255, 255, 0.2)",
              borderTop: "4px solid #007AFF",
              borderRadius: "50%",
              animation: "LoaderSpin 1s linear infinite",
              marginBottom: "24px",
            }}
          />

          <div style={{ fontSize: "20px", marginBottom: "16px" }}>
            Cargando experiencia 3D...
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "240px",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#007AFF",
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <div style={{ fontSize: "16px", color: "#ccc" }}>
            {Math.round(progress)}% completado
          </div>
        </div>
      )}
    </div>
  );
}

// Componente principal
export default function LoaderSystem({
  customLoader: CustomLoader = DefaultLoader,
  showProgress = true,
  timeout = 30000,
  onLoadStart,
  onLoadProgress,
  onLoadComplete,
  onLoadError,
}: LoaderSystemProps = {}) {
  const { active: isLoading, progress, errors } = useProgress();
  const [timeoutError, setTimeoutError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Obtener el primer error como string o null
  const error = errors.length > 0 ? errors[0] : null;

  console.log("🎯 LoaderSystem (Zustand):", {
    isLoading,
    progress,
    error,
    timeoutError,
    hasStarted,
  });

  // Añadir keyframes CSS al head
  useEffect(() => {
    const styleId = "oniria-loader-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes LoaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Manejar inicio y fin de la carga
  useEffect(() => {
    if (isLoading && !hasStarted) {
      console.log("🚀 Carga iniciada");
      setHasStarted(true);
      setTimeoutError(null);
      onLoadStart?.();

      // Configurar timeout
      if (timeout > 0) {
        timeoutRef.current = setTimeout(() => {
          const errorMsg =
            "Tiempo de carga agotado. Verifique su conexión e intente nuevamente.";
          setTimeoutError(errorMsg);
          onLoadError?.(new Error(errorMsg));
        }, timeout);
      }
    } else if (!isLoading && hasStarted) {
      console.log("✅ Carga completada");
      setHasStarted(false);

      // Limpiar timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (!error && !timeoutError) {
        onLoadComplete?.();
      }
    }
  }, [
    isLoading,
    hasStarted,
    error,
    timeoutError,
    timeout,
    onLoadStart,
    onLoadComplete,
    onLoadError,
  ]);

  // Callback de progreso
  useEffect(() => {
    if (showProgress && isLoading) {
      onLoadProgress?.(progress);
    }
  }, [progress, isLoading, showProgress, onLoadProgress]);

  // Manejar errores externos
  useEffect(() => {
    if (error) {
      onLoadError?.(new Error(error));
    }
  }, [error, onLoadError]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Determinar estado final
  const finalError = timeoutError || error;
  const finalProgress = Math.min(Math.max(progress, 0), 100); // Clamp entre 0-100
  const finalIsLoading = isLoading;

  console.log("🎯 Estado final:", {
    finalIsLoading,
    finalProgress: Math.round(finalProgress),
    finalError,
  });

  return (
    <CustomLoader
      progress={finalProgress}
      isLoading={finalIsLoading}
      error={finalError}
    />
  );
}
