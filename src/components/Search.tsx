import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { useControllable } from '../lib/useControllable';
import { FieldLabel } from './Field';
import { Icon } from './Icon';

export type SearchState = 'default' | 'hover' | 'focus' | 'filled';

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  state?: SearchState;
}

const box: Record<SearchState, string> = {
  default: 'bg-primary inset-ring inset-ring-(--border-color-strong)',
  hover: 'bg-btn-secondary-hover inset-ring inset-ring-(--border-color-inverse)',
  focus: 'bg-primary inset-ring inset-ring-(--border-color-focus)',
  filled: 'bg-primary inset-ring inset-ring-(--border-color-strong)',
};

const interactive =
  'hover:not-focus-within:bg-btn-secondary-hover hover:not-focus-within:inset-ring-(--border-color-inverse) focus-within:inset-ring-(--border-color-focus)';

export function Search({ label, value, defaultValue = '', onValueChange, state, id, placeholder = 'Search by...', className, ...rest }: SearchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [text, setText] = useControllable(value, defaultValue, onValueChange);
  const current: SearchState = state ?? (text ? 'filled' : 'default');

  return (
    <div data-state={state} className={cn('flex w-full flex-col gap-2', className)}>
      {label && <FieldLabel htmlFor={inputId} label={label} />}
      <div role="search" className={cn('flex items-center gap-2 rounded-lg py-2 px-3 transition-colors', box[current], !state && interactive)}>
        <Icon name="search" className="size-[1.25rem] text-icon-default" />
        <input
          id={inputId}
          type="search"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          aria-label={label ? undefined : placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm leading-base text-secondary outline-none placeholder:text-placeholder [&::-webkit-search-cancel-button]:hidden"
          {...rest}
        />
        {text && (
          <button type="button" onClick={() => setText('')} aria-label="Clear search" className="inline-flex text-primary">
            <Icon name="close" className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
