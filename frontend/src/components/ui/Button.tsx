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
    bg-gradient-to-r from-[#E3344A] to-[#ff4d6d]
    text-white
    hover:from-[#d92d42]
    hover:to-[#f43f5e]
    shadow-[0_10px_25px_rgba(227,52,74,0.28)]
  `,

secondary: `
  border border-[#E3344A]
  bg-white
  text-[#E3344A]
  hover:bg-[#E3344A]
  hover:text-white
  transition-all duration-300
  shadow-[0_8px_20px_rgba(227,52,74,0.10)]
`,
};

const baseStyles = `
  inline-flex items-center justify-center
  rounded-[5px]
  px-4 py-2
  text-sm
  font-semibold
  tracking-[0.05em]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:shadow-xl
  active:scale-[0.98]
  gap-2
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