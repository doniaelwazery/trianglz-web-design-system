import type { SVGProps } from 'react';
import { icons, type IconName } from '../icons/icons';
import { cn } from '../lib/cn';

export type { IconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** Accessible name. Leave empty for decorative icons (hidden from screen readers). */
  label?: string;
}

/** 24px icon from the Figma Icons page. Takes the surrounding text color. */
export function Icon({ name, label, className, ...rest }: IconProps) {
  const { viewBox, body } = icons[name];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      // 24px unless the caller sets a size (two size-* classes would fight over CSS order)
      className={cn('shrink-0', !/(^|\s)size-/.test(className ?? '') && 'size-[1.5rem]', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: body }}
      {...rest}
    />
  );
}
