import type { ReactNode } from 'react';

// Separado de Stepper.tsx para poder usar <Step> sin cargar el Stepper completo
// (el formulario de la hero carga el Stepper de forma diferida)
export interface StepProps {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="min-w-0">{children}</div>;
}
