// src/components/ui/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          message={this.state.errorMessage || this.props.fallbackMessage || 'Something went wrong'}
          onRetry={() => this.setState({ hasError: false, errorMessage: null })}
        />
      );
    }

    return this.props.children;
  }
}