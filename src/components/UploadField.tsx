import { useId, useState } from 'react';
import { cn } from '../lib/cn';
import { FieldHint, FieldLabel, FieldMessage } from './Field';
import { Icon } from './Icon';

export type UploadFieldState = 'default' | 'hover' | 'filled' | 'error' | 'disabled';

export interface UploadFieldProps {
  label?: string;
  optional?: boolean;
  helpText?: string;
  /** Accepted formats and max size, e.g. "Accepted Formats: PDF, Word, Excel. Max File Size: 5MB". */
  hint?: string;
  errorMessage?: string;
  /** Name of an already uploaded file (puts the field in the filled state). */
  fileName?: string;
  accept?: string;
  disabled?: boolean;
  onFileChange?: (file: File | null) => void;
  state?: UploadFieldState;
  id?: string;
  className?: string;
}

const box: Record<UploadFieldState, string> = {
  default: 'bg-primary inset-ring inset-ring-(--border-color-strong)',
  hover: 'bg-muted inset-ring inset-ring-(--border-color-strong)',
  filled: 'bg-primary inset-ring inset-ring-(--border-color-strong)',
  error: 'bg-primary inset-ring inset-ring-(--border-color-error)',
  disabled: 'bg-muted inset-ring inset-ring-(--border-color-strong)',
};

export function UploadField({ label, optional, helpText, hint, errorMessage, fileName, accept, disabled, onFileChange, state, id, className }: UploadFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [name, setName] = useState(fileName);
  const current: UploadFieldState = disabled ? 'disabled' : state ?? (errorMessage ? 'error' : name ? 'filled' : 'default');
  const live = !state && current === 'default';

  const pick = (file: File | null) => {
    setName(file?.name);
    onFileChange?.(file);
  };

  return (
    <div data-state={state} className={cn('flex w-full flex-col gap-2', current === 'disabled' && 'opacity-50', className)}>
      {label && <FieldLabel htmlFor={inputId} label={label} optional={optional} helpText={helpText} disabled={current === 'disabled'} />}
      {hint && <FieldHint id={`${inputId}-hint`}>{hint}</FieldHint>}
      {current === 'filled' ? (
        <div className={cn('flex items-center gap-2 rounded-lg p-2', box.filled)}>
          <Icon name="document" className="text-secondary" />
          <span className="min-w-0 flex-1 truncate text-sm text-secondary">{name}</span>
          <button type="button" onClick={() => pick(null)} aria-label={`Remove ${name}`} className="inline-flex text-error">
            <Icon name="trash" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={cn(
            'group flex items-center gap-2 rounded-lg p-2 transition-colors',
            box[current],
            current === 'disabled' ? 'cursor-not-allowed' : 'cursor-pointer',
            live && 'hover:bg-muted focus-within:outline-2 focus-within:outline-(--border-color-focus)',
          )}
        >
          <span
            className={cn(
              'flex items-center gap-2 text-sm',
              current === 'hover' ? 'text-(--background-color-btn-primary-hover)' : 'text-(--background-color-btn-primary)',
              live && 'group-hover:text-(--background-color-btn-primary-hover)',
            )}
          >
            <Icon name="upload-cloud" />
            Click to upload
          </span>
          <input
            id={inputId}
            type="file"
            accept={accept}
            disabled={current === 'disabled'}
            aria-invalid={current === 'error' || undefined}
            aria-describedby={current === 'error' && errorMessage ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            onChange={e => pick(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </label>
      )}
      {current === 'error' && errorMessage && (
        <FieldMessage id={`${inputId}-error`} tone="error">
          {errorMessage}
        </FieldMessage>
      )}
    </div>
  );
}
