import { cn } from '../lib/cn';
import { useControllable } from '../lib/useControllable';
import { Icon } from './Icon';

export interface NumericFieldProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Accessible name, e.g. "Guests". */
  label: string;
  className?: string;
}

/** Stepper for a small number. Figma's state=disabled is the minus button at its minimum. */
export function NumericField({ value, defaultValue = 0, onValueChange, min = 0, max = Infinity, step = 1, label, className }: NumericFieldProps) {
  const [count, setCount] = useControllable(value, defaultValue, onValueChange);
  const stepButton = 'inline-flex size-[2.25rem] items-center justify-center bg-btn-secondary-active disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div role="group" aria-label={label} className={cn('inline-flex items-center rounded-lg p-px inset-ring inset-ring-(--border-color-default)', className)}>
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={count <= min}
        onClick={() => setCount(Math.max(min, count - step))}
        className={cn(stepButton, 'rounded-l-lg text-(--border-color-btn-info)')}
      >
        <svg viewBox="0 0 20 20" className="size-[1.25rem]" aria-hidden>
          <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <output aria-live="polite" className="w-[2.25rem] text-center text-sm font-semibold text-primary">
        {count}
      </output>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={count >= max}
        onClick={() => setCount(Math.min(max, count + step))}
        className={cn(stepButton, 'rounded-r-lg text-(--background-color-btn-primary)')}
      >
        <Icon name="add" className="size-[1.25rem]" />
      </button>
    </div>
  );
}
