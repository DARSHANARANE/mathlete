import { useState } from "react";

type AddAction = {
  label: string;
  type: "upload" | "create";
  onClick: () => void;
};

export const useAddActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return {
    isOpen,
    openMenu,
    closeMenu,
  };
};