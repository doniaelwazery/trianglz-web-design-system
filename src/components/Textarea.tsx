import { useId, useState, type TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { FieldHint, FieldLabel } from './Field';

export type TextareaState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  optional?: boolean;
  helpText?: string;
  hint?: string;
  errorMessage?: string;
  state?: TextareaState;
}

const box: Record<TextareaState, string> = {
  default: 'bg-primary inset-ring inset-ring-(--border-color-default)',
  hover: 'bg-secondary inset-ring inset-ring-(--border-color-strong) shadow-sm',
  focus: 'bg-primary inset-ring-2 inset-ring-(--border-color-focus) shadow-sm',
  filled: 'bg-primary inset-ring inset-ring-(--border-color-default)',
  error: 'bg-primary inset-ring inset-ring-(--border-color-error) shadow-sm',
  disabled: 'bg-muted inset-ring inset-ring-(--border-color-strong)',
};

const interactive =
  'hover:not-focus-within:bg-secondary hover:not-focus-within:inset-ring-(--border-color-strong) hover:not-focus-within:shadow-sm focus-within:inset-ring-2 focus-within:inset-ring-(--border-color-focus) focus-within:shadow-sm';

export function Textarea({ label, optional, helpText, hint, errorMessage, state, id, disabled, className, value, defaultValue, onChange, rows = 4, ...rest }: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [typed, setTyped] = useState(String(defaultValue ?? '').length > 0);
  const hasValue = value !== undefined ? String(value).length > 0 : typed;
  const current: TextareaState = disabled ? 'disabled' : state ?? (errorMessage ? 'error' : hasValue ? 'filled' : 'default');

  return (
    <div data-state={state} className={cn('flex w-full flex-col gap-2', current === 'disabled' && 'opacity-50', className)}>
      {label && <FieldLabel htmlFor={fieldId} label={label} optional={optional} helpText={helpText} disabled={current === 'disabled'} />}
      {hint && <FieldHint id={`${fieldId}-hint`}>{hint}</FieldHint>}
      <div className={cn('flex rounded-lg p-2 transition-colors', box[current], !state && current !== 'disabled' && current !== 'error' && interactive)}>
        <textarea
          id={fieldId}
          rows={rows}
          disabled={current === 'disabled'}
          value={value}
          defaultValue={defaultValue}
          onChange={e => {
            setTyped(e.target.value.length > 0);
            onChange?.(e);
          }}
          aria-invalid={current === 'error' || undefined}
          aria-describedby={current === 'error' && errorMessage ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className="min-h-0 w-full flex-1 resize-y bg-transparent text-sm text-secondary outline-none placeholder:text-placeholder disabled:cursor-not-allowed"
          {...rest}
        />
      </div>
      {current === 'error' && errorMessage && (
        <p id={`${fieldId}-error`} role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
