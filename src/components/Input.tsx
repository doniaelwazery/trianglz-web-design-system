import { useId, useState, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { FieldHint, FieldLabel, FieldMessage } from './Field';
import { Icon, type IconName } from './Icon';

export type InputState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  optional?: boolean;
  helpText?: string;
  hint?: string;
  /** Shown below the field; also puts the field in the error state. */
  errorMessage?: string;
  /** Fixed text before the value, e.g. "http://" (Input / URL). */
  prefix?: string;
  /** Card brand logo before the value (Input / Card number). */
  paymentIcon?: boolean;
  /** Icon after the value, e.g. chevron-down for a select-like field. */
  icon?: IconName;
  /** Forces a visual state (docs and design review). Normally derived from value, errorMessage and disabled. */
  state?: InputState;
}

// Figma inside strokes are drawn with inset-ring so they don't change the field's size
const fieldBox: Record<InputState, string> = {
  default: 'bg-primary inset-ring inset-ring-(--border-color-default)',
  hover: 'bg-muted inset-ring inset-ring-(--border-color-strong) shadow-sm',
  focus: 'bg-primary inset-ring-2 inset-ring-(--border-color-focus) shadow-sm',
  filled: 'bg-primary inset-ring inset-ring-(--border-color-strong)',
  error: 'bg-primary inset-ring inset-ring-(--border-color-error) shadow-sm',
  disabled: 'bg-muted inset-ring inset-ring-(--border-color-strong)',
};

const fieldInteractive =
  'hover:not-focus-within:bg-muted hover:not-focus-within:inset-ring-(--border-color-strong) hover:not-focus-within:shadow-sm focus-within:bg-primary focus-within:inset-ring-2 focus-within:inset-ring-(--border-color-focus) focus-within:shadow-sm';

/** Mastercard artwork from Figma; brand colors stay as they are (not theme tokens). */
function PaymentIcon() {
  return (
    <span className="inline-flex h-[1.5rem] w-[2.125rem] shrink-0 items-center justify-center rounded-base bg-primary inset-ring inset-ring-(--border-color-muted)">
      <svg viewBox="0 0 22 13" className="h-[0.8125rem] w-[1.375rem]" aria-label="Mastercard" role="img">
        <circle cx="6.5" cy="6.5" r="6.5" fill="#ED0006" />
        <circle cx="15.5" cy="6.5" r="6.5" fill="#F9A000" />
        <path d="M11 1.81A6.5 6.5 0 0 1 11 11.19 6.5 6.5 0 0 1 11 1.81Z" fill="#FF5E00" />
      </svg>
    </span>
  );
}

export function Input({
  label,
  optional,
  helpText,
  hint,
  errorMessage,
  prefix,
  paymentIcon,
  icon,
  state,
  id,
  disabled,
  className,
  value,
  defaultValue,
  onChange,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [typed, setTyped] = useState(String(defaultValue ?? '').length > 0);
  const hasValue = value !== undefined ? String(value).length > 0 : typed;
  const current: InputState = disabled ? 'disabled' : state ?? (errorMessage ? 'error' : hasValue ? 'filled' : 'default');
  const live = !state && current !== 'disabled';

  return (
    <div data-state={state} className={cn('flex w-full flex-col gap-2', current === 'disabled' && 'opacity-50', className)}>
      {label && <FieldLabel htmlFor={inputId} label={label} optional={optional} helpText={helpText} disabled={current === 'disabled'} />}
      {hint && current !== 'error' && <FieldHint id={`${inputId}-hint`}>{hint}</FieldHint>}
      <div className={cn('flex items-center gap-2 rounded-lg p-2 transition-colors', fieldBox[current], live && current !== 'error' && fieldInteractive)}>
        {paymentIcon && <PaymentIcon />}
        {prefix && (
          <span className="flex items-center gap-2 text-sm text-secondary">
            {prefix}
            <span aria-hidden className="h-4 w-px bg-(--border-color-strong)" />
          </span>
        )}
        <input
          id={inputId}
          disabled={current === 'disabled'}
          value={value}
          defaultValue={defaultValue}
          onChange={e => {
            setTyped(e.target.value.length > 0);
            onChange?.(e);
          }}
          aria-invalid={current === 'error' || undefined}
          aria-describedby={current === 'error' && errorMessage ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm leading-base text-secondary outline-none placeholder:text-placeholder disabled:cursor-not-allowed"
          {...rest}
        />
        {icon && <Icon name={icon} className="size-4 text-primary" />}
      </div>
      {current === 'error' && errorMessage && (
        <FieldMessage id={`${inputId}-error`} tone="error">
          {errorMessage}
        </FieldMessage>
      )}
    </div>
  );
}
