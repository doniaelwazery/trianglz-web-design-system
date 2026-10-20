import { useState } from 'react';

/** State that can be controlled by a prop or kept internally (uncontrolled). */
export function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const set = (next: T) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };
  return [controlled ? value : inner, set] as const;
}
