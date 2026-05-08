import { Link } from "react-router-dom";
import clsx from "clsx";

type UIButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const variants = {
  primary: `
    bg-[#E3344A]
    text-white
    hover:bg-[#d92d42]
    shadow-[0_2px_0_rgba(0,0,0,0.04)]
  `,

  secondary: `
    text-[#E3344A]
    border border-[#E3344A]
    bg-white
    hover:bg-[#E3344A]
    hover:text-white
  `,
};

const baseStyles = `
  inline-flex items-center justify-center
  rounded-full
  px-10 py-3
  text-sm
  font-medium
  tracking-[0.05em]
  transition-all duration-300
  hover:-translate-y-[1px]
`;

const UIButton = ({
  children,
  to,
  onClick,
  className,
  type = "button",
  variant = "primary",
}: UIButtonProps) => {
  const classes = clsx(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default UIButton;