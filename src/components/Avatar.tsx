import { useEffect, useId, useState } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export type AvatarVariant = 'photo' | 'text' | 'icon';
export type AvatarSize = 'xs' | 'sm' | 'base' | 'lg';

export interface AvatarProps {
  /** Defaults to photo when `src` is set, text when `name` is set, otherwise icon. */
  variant?: AvatarVariant;
  size?: AvatarSize;
  src?: string;
  /** Person's name: alt text for the photo and source of the initials. */
  name?: string;
  className?: string;
}

const sizes: Record<AvatarSize, { box: string; text: string }> = {
  lg: { box: 'size-25', text: 'text-2xl font-semibold' },
  base: { box: 'size-15', text: 'text-lg font-medium' },
  sm: { box: 'size-[2.5rem]', text: 'text-sm font-medium' },
  xs: { box: 'size-[2rem]', text: 'text-xs font-medium' },
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]!.toUpperCase())
    .join('');

/** A person, shown as photo → initials → icon (in that order of preference). */
export function Avatar({ variant, size = 'base', src, name, className }: AvatarProps) {
  const kind = variant ?? (src ? 'photo' : name ? 'text' : 'icon');
  const s = sizes[size];
  const frame = cn('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--background-color-btn-neutral-active)', s.box, className);

  if (kind === 'photo' && src) {
    return <img src={src} alt={name ?? ''} className={cn(frame, 'object-cover outline -outline-offset-1 outline-(--border-color-strong)')} />;
  }
  if (kind === 'text' && name) {
    return (
      <span role="img" aria-label={name} className={cn(frame, s.text, 'text-secondary')}>
        {initials(name)}
      </span>
    );
  }
  return (
    <span role="img" aria-label={name ?? 'User'} className={frame}>
      <Icon name="user" className="size-3/5 text-(--background-color-primary)" />
    </span>
  );
}

export type AvatarUploadState = 'default' | 'filled' | 'error';

export interface AvatarUploadProps {
  /** Current picture URL. */
  src?: string;
  onFileChange?: (file: File) => void;
  /** Puts the avatar in the error state (e.g. file too large); show the message nearby. */
  error?: boolean;
  state?: AvatarUploadState;
  label?: string;
  className?: string;
}

/** Lets people add or change their profile picture. For other files use UploadField. */
export function AvatarUpload({ src, onFileChange, error, state, label = 'Change profile picture', className }: AvatarUploadProps) {
  const id = useId();
  const [preview, setPreview] = useState(src);
  useEffect(() => setPreview(src), [src]);
  const current: AvatarUploadState = state ?? (error ? 'error' : preview ? 'filled' : 'default');

  return (
    <div data-state={state} className={cn('relative inline-flex', className)}>
      <span
        className={cn(
          'inline-flex size-25 items-center justify-center overflow-hidden rounded-full bg-(--background-color-btn-neutral-active)',
          current === 'error' && 'outline -outline-offset-1 outline-(--border-color-error)',
        )}
      >
        {current === 'filled' && preview ? <img src={preview} alt="" className="size-full object-cover" /> : <Icon name="user" className="size-3/5 text-(--background-color-primary)" />}
      </span>
      <label
        htmlFor={id}
        className="absolute -right-1 bottom-0 inline-flex size-[2.25rem] cursor-pointer items-center justify-center rounded-full bg-btn-primary text-(--background-color-primary) focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--border-color-focus)"
      >
        <Icon name="pencil" className="size-4" />
        <span className="sr-only">{label}</span>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            setPreview(URL.createObjectURL(file));
            onFileChange?.(file);
          }}
        />
      </label>
    </div>
  );
}
