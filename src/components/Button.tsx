import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'filled' | 'outline' | 'pill' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type ButtonIconPosition = 'none' | 'left' | 'right' | 'only';
export type ButtonState = 'default' | 'hover' | 'focus' | 'disabled';
/** Fill color for `filled` (Figma `color` variant). Code also applies it to `pill`. */
export type ButtonColor = 'primary' | 'info' | 'success' | 'warning' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: ButtonIconPosition;
  icon?: IconName;
  color?: ButtonColor;
  /** Forces a visual state (docs and design review). Leave unset in product code: hover and focus come from the browser. */
  state?: ButtonState;
}

const sizes: Record<ButtonSize, string> = {
  xl: 'py-4 px-6 text-base leading-base',
  lg: 'py-3 px-5 text-base leading-base',
  base: 'py-2 px-5 text-sm leading-base',
  sm: 'py-2 px-3 text-sm leading-sm',
  xs: 'py-2 px-3 text-xs leading-xs',
};

type Look = { base: string; hover: string; focus: string; interactive: string };

const filled: Record<ButtonColor, Look> = {
  primary: {
    base: 'bg-btn-primary text-btn-primary',
    hover: 'bg-btn-primary-hover',
    focus: 'bg-btn-primary-active outline-3 outline-(--border-color-btn-primary)',
    interactive: 'hover:bg-btn-primary-hover active:bg-btn-primary-active focus-visible:bg-btn-primary-active focus-visible:outline-3 focus-visible:outline-(--border-color-btn-primary)',
  },
  info: {
    base: 'bg-btn-info text-btn-info-label',
    hover: 'bg-btn-info-hover',
    focus: 'bg-btn-info-active outline-3 outline-(--border-color-btn-info)',
    interactive: 'hover:bg-btn-info-hover active:bg-btn-info-active focus-visible:bg-btn-info-active focus-visible:outline-3 focus-visible:outline-(--border-color-btn-info)',
  },
  success: {
    base: 'bg-btn-success text-btn-success-label',
    hover: 'bg-btn-success-hover',
    focus: 'bg-btn-success-active outline-3 outline-(--border-color-btn-success)',
    interactive: 'hover:bg-btn-success-hover active:bg-btn-success-active focus-visible:bg-btn-success-active focus-visible:outline-3 focus-visible:outline-(--border-color-btn-success)',
  },
  warning: {
    base: 'bg-btn-warning text-btn-warning-label',
    hover: 'bg-btn-warning-hover',
    focus: 'bg-btn-warning-active outline-3 outline-(--border-color-btn-warning)',
    interactive: 'hover:bg-btn-warning-hover active:bg-btn-warning-active focus-visible:bg-btn-warning-active focus-visible:outline-3 focus-visible:outline-(--border-color-btn-warning)',
  },
  danger: {
    base: 'bg-btn-danger text-btn-danger-label',
    hover: 'bg-btn-danger-hover',
    focus: 'bg-btn-danger-active outline-3 outline-(--border-color-btn-danger)',
    interactive: 'hover:bg-btn-danger-hover active:bg-btn-danger-active focus-visible:bg-btn-danger-active focus-visible:outline-3 focus-visible:outline-(--border-color-btn-danger)',
  },
};

const outline: Look = {
  base: 'bg-transparent text-btn-secondary inset-ring inset-ring-(--border-color-btn-secondary)',
  hover: 'bg-btn-secondary-hover',
  focus: 'bg-btn-secondary-hover outline-3 outline-(--border-color-focus)',
  interactive: 'hover:bg-btn-secondary-hover active:bg-btn-secondary-active focus-visible:bg-btn-secondary-hover focus-visible:outline-3 focus-visible:outline-(--border-color-focus)',
};

const link: Look = {
  base: 'bg-transparent text-link',
  hover: 'bg-btn-secondary',
  focus: 'outline-3 outline-(--border-color-focus)',
  interactive: 'hover:bg-btn-secondary focus-visible:outline-3 focus-visible:outline-(--border-color-focus)',
};

// Disabled uses the color's light fill (outline and link use primary, as in Figma)
const disabledLook: Record<ButtonColor, string> = {
  primary: 'bg-btn-primary-light text-btn-primary',
  info: 'bg-btn-info-light text-btn-info-label',
  success: 'bg-btn-success-light text-btn-success-label',
  warning: 'bg-btn-warning-light text-btn-warning-label',
  danger: 'bg-btn-danger-light text-btn-danger-label',
};

const defaultIcon: Record<Exclude<ButtonIconPosition, 'none'>, IconName> = { left: 'add', right: 'chevron-right', only: 'upload' };

export function Button({
  variant = 'filled',
  size = 'base',
  iconPosition = 'none',
  icon,
  color = 'primary',
  state,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const current = disabled ? 'disabled' : state ?? 'default';
  const look = variant === 'outline' ? outline : variant === 'link' ? link : filled[color];
  const iconName = iconPosition === 'none' ? null : icon ?? defaultIcon[iconPosition];
  // Figma: 12px icon on xs buttons, 18px on base (other sizes follow base until Figma says otherwise)
  const iconEl = iconName && <Icon name={iconName} className={size === 'xs' ? 'size-3' : 'size-4.5'} />;

  return (
    <button
      type={type}
      disabled={current === 'disabled'}
      data-state={state}
      aria-label={iconPosition === 'only' && typeof children === 'string' ? children : rest['aria-label']}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors',
        variant === 'pill' ? 'rounded-3xl' : 'rounded-md',
        iconPosition === 'none' ? 'gap-0' : 'gap-1',
        sizes[size],
        current === 'disabled'
          ? cn('cursor-not-allowed', disabledLook[variant === 'outline' || variant === 'link' ? 'primary' : color])
          : cn(look.base, current === 'hover' && look.hover, current === 'focus' && look.focus, !state && look.interactive),
        className,
      )}
      {...rest}
    >
      {iconPosition === 'left' && iconEl}
      {/* icon-only keeps the text line height so it matches the other buttons of its size */}
      {iconPosition === 'only' ? <span className="inline-flex h-lh items-center">{iconEl}</span> : children}
      {iconPosition === 'right' && iconEl}
    </button>
  );
}
