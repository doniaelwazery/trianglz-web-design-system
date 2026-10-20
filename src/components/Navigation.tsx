import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type ItemState = 'default' | 'hover' | 'active' | 'disabled';

// ---- Pagination ----

export type PaginationItemVariant = 'number' | 'ellipsis' | 'prev' | 'next';

export interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PaginationItemVariant;
  /** active = current page. */
  state?: ItemState;
}

const pageLook: Record<Exclude<ItemState, 'disabled'>, string> = {
  default: 'bg-primary text-primary inset-ring inset-ring-(--border-color-default)',
  hover: 'bg-secondary text-primary inset-ring inset-ring-(--border-color-default)',
  active: 'bg-btn-primary text-inverse',
};

/** One control in a pagination bar. Prefer the Pagination component for a full bar. */
export function PaginationItem({ variant = 'number', state = 'default', disabled, children, className, ...rest }: PaginationItemProps) {
  if (variant === 'ellipsis') {
    return (
      <span aria-hidden className={cn('inline-flex min-w-[2.5rem] items-center justify-center py-2.5 text-sm text-secondary', className)}>
        …
      </span>
    );
  }
  const off = disabled || state === 'disabled';
  const look = off ? 'bg-primary text-disabled inset-ring inset-ring-(--border-color-default)' : pageLook[state as Exclude<ItemState, 'disabled'>];
  return (
    <button
      type="button"
      disabled={off}
      aria-current={state === 'active' ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-md py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed',
        variant === 'number' ? 'min-w-[2.5rem] px-2' : 'gap-2 px-4',
        look,
        state === 'default' && !off && 'hover:bg-secondary',
        className,
      )}
      {...rest}
    >
      {variant === 'prev' && <span className="font-regular">←</span>}
      {variant === 'prev' ? children ?? 'Previous' : variant === 'next' ? children ?? 'Next' : children}
      {variant === 'next' && <span className="font-regular">→</span>}
    </button>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page before an ellipsis. */
  siblings?: number;
  className?: string;
}

function pageList(page: number, count: number, siblings: number): Array<number | 'gap'> {
  const pages = new Set([1, count]);
  for (let p = page - siblings; p <= page + siblings; p++) if (p >= 1 && p <= count) pages.add(p);
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? (['gap', p] as const) : [p]));
}

export function Pagination({ page, pageCount, onPageChange, siblings = 1, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn('flex flex-wrap items-center gap-2', className)}>
      <PaginationItem variant="prev" disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
      {pageList(page, pageCount, siblings).map((p, i) =>
        p === 'gap' ? (
          <PaginationItem key={`gap-${i}`} variant="ellipsis" />
        ) : (
          <PaginationItem key={p} state={p === page ? 'active' : 'default'} onClick={() => onPageChange(p)} aria-label={`Page ${p}`}>
            {p}
          </PaginationItem>
        ),
      )}
      <PaginationItem variant="next" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} />
    </nav>
  );
}

// ---- Tabs ----

export type TabVariant = 'underline' | 'pill';

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TabVariant;
  /** active = selected tab. */
  state?: ItemState;
}

const tabLook: Record<TabVariant, Record<ItemState, string>> = {
  underline: {
    default: 'text-secondary',
    hover: 'text-primary',
    // Figma: 2px inside stroke on the bottom edge only, so the tab keeps its 36px height
    active: 'text-link shadow-[inset_0_-2px_0_0_var(--border-color-focus)]',
    disabled: 'text-disabled',
  },
  pill: {
    default: 'text-secondary rounded-lg',
    hover: 'text-primary rounded-lg bg-muted',
    active: 'text-link rounded-lg bg-secondary',
    disabled: 'text-disabled rounded-lg',
  },
};

const tabHover: Record<TabVariant, string> = {
  underline: 'hover:text-primary',
  pill: 'hover:text-primary hover:bg-muted',
};

/** One tab. Switches views on the same page; don't use it to navigate to another page. */
export function TabItem({ variant = 'underline', state = 'default', disabled, className, ...rest }: TabItemProps) {
  const current = disabled ? 'disabled' : state;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={current === 'active'}
      disabled={current === 'disabled'}
      className={cn(
        'inline-flex items-center justify-center py-2 px-4 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-(--border-color-focus)',
        tabLook[variant][current],
        current === 'default' && tabHover[variant],
        className,
      )}
      {...rest}
    />
  );
}

export interface TabsProps {
  variant?: TabVariant;
  tabs: Array<{ id: string; label: ReactNode; disabled?: boolean }>;
  value: string;
  onValueChange: (id: string) => void;
  'aria-label': string;
  className?: string;
}

/** Tab bar. The container styling (underline rule / pill track) is inferred from the Figma examples. */
export function Tabs({ variant = 'underline', tabs, value, onValueChange, className, ...rest }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label={rest['aria-label']}
      className={cn('flex', variant === 'underline' ? 'border-b border-default' : 'inline-flex gap-1 rounded-lg bg-secondary p-1', className)}
    >
      {tabs.map(t => (
        <TabItem key={t.id} variant={variant} state={t.id === value ? 'active' : 'default'} disabled={t.disabled} onClick={() => onValueChange(t.id)}>
          {t.label}
        </TabItem>
      ))}
    </div>
  );
}
