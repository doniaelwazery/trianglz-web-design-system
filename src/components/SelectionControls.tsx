import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useControllable } from '../lib/useControllable';

export type ControlState = 'default' | 'disabled';
type Checked = boolean | 'indeterminate';

const labelText = (disabled: boolean) => cn('text-sm', disabled ? 'text-muted' : 'text-secondary');
// Figma has no focus state for these controls; this ring keeps them usable from the keyboard
const keyboardFocus = 'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--border-color-focus)';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'type' | 'onChange'> {
  checked?: Checked;
  defaultChecked?: Checked;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label. Figma: labelText (text) + label (show/hide). */
  labelText?: ReactNode;
  state?: ControlState;
}

export function Checkbox({ checked, defaultChecked = false, onCheckedChange, labelText: text, state, disabled, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useControllable<Checked>(checked, defaultChecked, v => onCheckedChange?.(v === true));
  const off = disabled || state === 'disabled';
  const on = value === true || value === 'indeterminate';
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = value === 'indeterminate';
  }, [value]);

  return (
    <label className={cn('inline-flex items-center gap-2', off ? 'cursor-not-allowed' : 'cursor-pointer', className)}>
      <span className="relative inline-flex size-[1.25rem] shrink-0">
        <input ref={ref} type="checkbox" checked={value === true} disabled={off} onChange={e => setValue(e.target.checked)} className="peer absolute inset-0 m-0 cursor-[inherit] opacity-0" {...rest} />
        <span
          aria-hidden
          className={cn(
            'pointer-events-none flex size-full items-center justify-center rounded-base inset-ring-2',
            on ? 'bg-btn-primary inset-ring-(--background-color-btn-primary)' : 'bg-primary inset-ring-(--border-color-strong)',
            off && (on ? 'opacity-50' : 'opacity-40'),
            keyboardFocus,
          )}
        >
          {on && (
            <svg viewBox="0 0 20 20" className="size-full text-(--border-color-default)">
              <path d={value === 'indeterminate' ? 'M5.91663 10H14.0833' : 'M14.6667 6.5L8.25004 12.9167L5.33337 10'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          )}
        </span>
      </span>
      {text && <span className={labelText(!!off)}>{text}</span>}
    </label>
  );
}

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  labelText?: ReactNode;
  state?: ControlState;
}

/** Use several with the same `name`; the browser keeps exactly one checked. */
export function RadioButton({ labelText: text, state, disabled, checked, defaultChecked, className, ...rest }: RadioButtonProps) {
  const off = disabled || state === 'disabled';
  return (
    <label className={cn('inline-flex items-center gap-2', off ? 'cursor-not-allowed' : 'cursor-pointer', className)}>
      <span className="relative inline-flex size-[1.25rem] shrink-0">
        <input type="radio" checked={checked} defaultChecked={defaultChecked} disabled={off} className="peer absolute inset-0 m-0 cursor-[inherit] opacity-0" {...rest} />
        <span
          aria-hidden
          className={cn(
            'pointer-events-none flex size-full items-center justify-center rounded-full inset-ring-2 inset-ring-(--border-color-strong)',
            'peer-checked:inset-ring-(--background-color-btn-primary) peer-checked:[&>span]:block',
            off && 'opacity-40 peer-checked:opacity-50',
            keyboardFocus,
          )}
        >
          <span className="hidden size-2.5 rounded-full bg-btn-primary" />
        </span>
      </span>
      {text && <span className={labelText(!!off)}>{text}</span>}
    </label>
  );
}

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label. Figma: label (show/hide). */
  label?: ReactNode;
  /** Accessible name when there is no visible label. */
  'aria-label'?: string;
  disabled?: boolean;
  state?: ControlState;
  className?: string;
}

export function Toggle({ checked, defaultChecked = false, onCheckedChange, label, disabled, state, className, ...rest }: ToggleProps) {
  const [on, setOn] = useControllable(checked, defaultChecked, onCheckedChange);
  const off = disabled || state === 'disabled';
  return (
    <label className={cn('inline-flex items-center gap-2', off ? 'cursor-not-allowed' : 'cursor-pointer', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={rest['aria-label']}
        disabled={off}
        onClick={() => setOn(!on)}
        className={cn(
          'flex h-[1.5rem] w-[2.75rem] shrink-0 items-center rounded-full p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus) disabled:cursor-not-allowed',
          on ? 'bg-btn-primary' : off ? 'bg-subtle' : 'bg-(--background-color-btn-neutral-active)',
          off && (on ? 'opacity-30' : 'opacity-50'),
        )}
      >
        <span className={cn('size-4 rounded-full bg-primary transition-transform', on && 'translate-x-[1.25rem]')} />
      </button>
      {label && <span className={labelText(!!off)}>{label}</span>}
    </label>
  );
}
