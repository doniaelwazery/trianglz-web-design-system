import { useId, useRef, type InputHTMLAttributes, type Ref } from 'react';
import { cn } from '../lib/cn';
import { useControllable } from '../lib/useControllable';
import { FieldHint, FieldMessage } from './Field';

export type CodeFieldState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'success' | 'disabled';

export interface CodeFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  state?: CodeFieldState;
  ref?: Ref<HTMLInputElement>;
}

const codeBox: Record<CodeFieldState, string> = {
  default: 'bg-btn-secondary inset-ring inset-ring-(--border-color-strong)',
  hover: 'bg-btn-secondary-hover inset-ring-2 inset-ring-(--border-color-strong)',
  focus: 'bg-btn-secondary inset-ring-2 inset-ring-(--border-color-focus)',
  filled: 'bg-btn-secondary inset-ring inset-ring-(--border-color-strong)',
  error: 'bg-btn-secondary inset-ring-2 inset-ring-(--border-color-error)',
  success: 'bg-btn-secondary inset-ring-2 inset-ring-(--border-color-success)',
  disabled: 'bg-btn-secondary inset-ring inset-ring-(--border-color-strong) opacity-40',
};

/** One digit of a verification code. Use inside VerificationCodeInput, not on its own. */
export function CodeField({ state = 'default', className, disabled, ...rest }: CodeFieldProps) {
  const current = disabled ? 'disabled' : state;
  const live = current === 'default' || current === 'filled';
  return (
    <input
      inputMode="numeric"
      maxLength={1}
      autoComplete="one-time-code"
      disabled={current === 'disabled'}
      className={cn(
        'size-15 shrink-0 rounded-lg text-center text-2xl font-semibold text-primary shadow-xs outline-none transition-colors disabled:cursor-not-allowed',
        codeBox[current],
        live && 'hover:not-focus:bg-btn-secondary-hover hover:not-focus:inset-ring-2 focus:inset-ring-2 focus:inset-ring-(--border-color-focus)',
        className,
      )}
      {...rest}
    />
  );
}

export type VerificationCodeInputState = 'default' | 'filled' | 'disabled' | 'success' | 'error';

export interface VerificationCodeInputProps {
  label?: string;
  hint?: string;
  successMessage?: string;
  errorMessage?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  state?: VerificationCodeInputState;
  className?: string;
}

export function VerificationCodeInput({
  label = 'Enter code',
  hint,
  successMessage,
  errorMessage,
  length = 6,
  value,
  defaultValue = '',
  onValueChange,
  disabled,
  state,
  className,
}: VerificationCodeInputProps) {
  const id = useId();
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [code, setCode] = useControllable(value, defaultValue, onValueChange);
  const current: VerificationCodeInputState =
    disabled ? 'disabled' : state ?? (errorMessage ? 'error' : successMessage ? 'success' : code.length === length ? 'filled' : 'default');
  const fieldState: CodeFieldState = current === 'error' || current === 'success' || current === 'disabled' ? current : 'default';

  const setDigits = (index: number, digits: string) => {
    const chars = code.padEnd(length, ' ').split('');
    digits.split('').slice(0, length - index).forEach((d, i) => (chars[index + i] = d));
    setCode(chars.join('').trimEnd());
    refs.current[Math.min(index + digits.length, length - 1)]?.focus();
  };

  return (
    <div data-state={state} role="group" aria-labelledby={`${id}-label`} className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex flex-col gap-1.5">
        <span id={`${id}-label`} className="text-sm font-medium text-primary">
          {label}
        </span>
        <div className="flex items-center gap-3">
          {Array.from({ length }, (_, i) => (
            <CodeField
              key={i}
              ref={el => {
                refs.current[i] = el;
              }}
              aria-label={`Digit ${i + 1}`}
              state={fieldState}
              value={code[i]?.trim() ?? ''}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, '');
                if (digits) setDigits(i, digits);
              }}
              onPaste={e => {
                e.preventDefault();
                setDigits(i, e.clipboardData.getData('text').replace(/\D/g, ''));
              }}
              onKeyDown={e => {
                if (e.key !== 'Backspace') return;
                e.preventDefault();
                const chars = code.padEnd(length, ' ').split('');
                const target = chars[i].trim() ? i : Math.max(i - 1, 0);
                chars[target] = ' ';
                setCode(chars.join('').trimEnd());
                refs.current[target]?.focus();
              }}
            />
          ))}
        </div>
      </div>
      {current === 'success' && successMessage ? (
        <FieldMessage tone="success" icon="check">
          {successMessage}
        </FieldMessage>
      ) : current === 'error' && errorMessage ? (
        <FieldMessage tone="error" icon="alert-circle">
          {errorMessage}
        </FieldMessage>
      ) : (
        hint && <FieldHint>{hint}</FieldHint>
      )}
    </div>
  );
}
