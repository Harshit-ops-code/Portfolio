import React, { Component, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WebGLFallback />;
    }
    return this.props.children;
  }
}

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br from-[#0a001a] via-[#1a0b2e] to-[#f20089]/30 opacity-70",
        className
      )}
    />
  );
}

