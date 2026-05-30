import { useCallback, useState } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return { isOpen, openMenu, closeMenu };
}
