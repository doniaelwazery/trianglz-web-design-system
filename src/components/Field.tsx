// Label row, hint and message lines shared by the form components.
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Icon, type IconName } from './Icon';

export interface FieldLabelProps {
  htmlFor?: string;
  label: ReactNode;
  optional?: boolean;
  /** Shows the help icon; the text is its tooltip and accessible name. */
  helpText?: string;
  disabled?: boolean;
}

export function FieldLabel({ htmlFor, label, optional, helpText, disabled }: FieldLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={htmlFor} className={cn('text-sm font-medium', disabled ? 'text-secondary' : 'text-primary')}>
        {label}
      </label>
      {(optional || helpText) && (
        <span className="flex items-center gap-1">
          {optional && <span className="text-sm text-muted">(Optional)</span>}
          {helpText && (
            <span title={helpText} className="inline-flex text-secondary">
              <Icon name="info-circle" label={helpText} className="size-4" />
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export function FieldHint({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="text-xs text-muted">
      {children}
    </p>
  );
}

export function FieldMessage({ id, tone, icon, children }: { id?: string; tone: 'error' | 'success'; icon?: IconName; children: ReactNode }) {
  return (
    <p id={id} role={tone === 'error' ? 'alert' : undefined} className={cn('flex items-center gap-1.5 text-xs', tone === 'error' ? 'text-error' : 'text-success')}>
      {icon && <Icon name={icon} className="size-4.5" />}
      {children}
    </p>
  );
}
