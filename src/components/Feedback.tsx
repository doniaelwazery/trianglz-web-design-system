import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';

export type FeedbackVariant = 'info' | 'warning' | 'danger' | 'success';

// Warning and success titles/icons use the button fill tokens in Figma (no matching text token exists),
// so they read the background variable directly.
const tone: Record<FeedbackVariant, { surface: string; accent: string; body: string; icon: IconName }> = {
  info: { surface: 'bg-btn-info-light outline-(--border-color-btn-primary)', accent: 'text-info', body: 'text-btn-info', icon: 'info-circle' },
  warning: { surface: 'bg-btn-warning-light outline-(--border-color-btn-warning)', accent: 'text-(--background-color-btn-warning)', body: 'text-btn-warning', icon: 'exclamation' },
  danger: { surface: 'bg-btn-danger-light outline-(--border-color-error)', accent: 'text-error', body: 'text-btn-danger', icon: 'danger' },
  success: { surface: 'bg-btn-success-light outline-(--border-color-btn-success)', accent: 'text-(--background-color-btn-success)', body: 'text-btn-success', icon: 'check-circle' },
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: FeedbackVariant;
  title: ReactNode;
  /** Shows the close button. */
  onClose?: () => void;
}

/** Page- or section-level message. For short status labels use Badge. */
export function Alert({ variant = 'info', title, children, onClose, className, ...rest }: AlertProps) {
  const t = tone[variant];
  return (
    <div
      role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}
      className={cn('flex items-center gap-4 rounded-lg py-2 px-6 outline', t.surface, className)}
      {...rest}
    >
      <Icon name={t.icon} className={cn('size-[2rem]', t.accent)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={cn('text-sm font-medium', t.accent)}>{title}</p>
        {children && <p className={cn('text-sm', t.body)}>{children}</p>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" className="inline-flex text-primary">
          <Icon name="close" />
        </button>
      )}
    </div>
  );
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: FeedbackVariant;
  /** Shows the trailing info icon (on by default, as in Figma). */
  icon?: boolean;
}

/** Short status label. For messages that need explanation use Alert. */
export function Badge({ variant = 'info', icon = true, children, className, ...rest }: BadgeProps) {
  const t = tone[variant];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-2xl py-1 px-2 text-xs outline', t.surface, t.accent, className)} {...rest}>
      {children}
      {icon && <Icon name="info-circle" className="size-4" />}
    </span>
  );
}

const popup: Record<FeedbackVariant, { icon: IconName; chip: string; iconColor: string; confirm: 'primary' | 'warning' | 'danger' }> = {
  info: { icon: 'info-circle', chip: 'bg-btn-info-light', iconColor: 'text-info', confirm: 'primary' },
  success: { icon: 'check-circle', chip: 'bg-btn-success-light', iconColor: 'text-(--background-color-btn-success)', confirm: 'primary' },
  warning: { icon: 'exclamation', chip: 'bg-btn-warning-light', iconColor: 'text-(--background-color-btn-warning)', confirm: 'warning' },
  danger: { icon: 'delete', chip: 'bg-btn-danger-light', iconColor: 'text-error', confirm: 'danger' },
};

export interface ConfirmationPopupProps {
  variant?: FeedbackVariant;
  title: ReactNode;
  children?: ReactNode;
  /** Name the action ("Delete file"), not "OK". */
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
}

/** Confirms an important or destructive action. Render it inside your modal/overlay. */
export function ConfirmationPopup({ variant = 'info', title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel, onClose, className }: ConfirmationPopupProps) {
  const p = popup[variant];
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn('relative flex w-full max-w-[27.6875rem] flex-col items-center gap-6 rounded-lg bg-primary p-10 text-center inset-ring inset-ring-(--border-color-default)', className)}
    >
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 inline-flex text-primary">
          <Icon name="close" />
        </button>
      )}
      <div className="flex flex-col items-center gap-4">
        <span className={cn('flex rounded-full p-2', p.chip)}>
          <Icon name={p.icon} className={cn('size-[2rem]', p.iconColor)} />
        </span>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-medium text-primary">{title}</h2>
          {children && <p className="text-sm text-secondary">{children}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="xs" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button size="xs" color={p.confirm} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

export type TooltipArrow = 'up' | 'down' | 'left' | 'right';

export interface TooltipProps {
  /** Which way the arrow points, i.e. where the trigger is. "down" = tooltip above the trigger. */
  arrow?: TooltipArrow;
  size?: 'sm' | 'lg';
  content: ReactNode;
  /** The trigger. Without it, the tooltip bubble renders on its own (docs). */
  children?: ReactNode;
  className?: string;
}

const arrowPos: Record<TooltipArrow, string> = {
  down: '-bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b',
  up: '-top-1.5 left-1/2 -translate-x-1/2 border-l border-t',
  left: 'top-1/2 -left-1.5 -translate-y-1/2 border-l border-b',
  right: 'top-1/2 -right-1.5 -translate-y-1/2 border-r border-t',
};

const bubblePos: Record<TooltipArrow, string> = {
  down: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  up: 'top-full left-1/2 mt-2.5 -translate-x-1/2',
  left: 'left-full top-1/2 ml-2.5 -translate-y-1/2',
  right: 'right-full top-1/2 mr-2.5 -translate-y-1/2',
};

/** Short hint on hover or keyboard focus. Never put essential information or actions in it. */
export function Tooltip({ arrow = 'down', size = 'sm', content, children, className }: TooltipProps) {
  const bubble = (
    <span
      role="tooltip"
      className={cn(
        'relative block rounded-lg bg-primary p-3 text-xs text-primary shadow-md inset-ring inset-ring-(--border-color-muted)',
        size === 'sm' ? 'whitespace-nowrap' : 'w-[20rem]',
        Boolean(children) && cn('pointer-events-none absolute z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100', bubblePos[arrow]),
        !children && className,
      )}
    >
      {content}
      <span aria-hidden className={cn('absolute size-3 rotate-45 border-(--border-color-muted) bg-primary', arrowPos[arrow])} />
    </span>
  );
  if (!children) return bubble;
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      {bubble}
    </span>
  );
}
