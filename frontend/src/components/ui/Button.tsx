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
    bg-gradient-to-r from-[#D90621] via-[#EE3344] to-[#ff6b81]
    text-white
    hover:from-[#cf2e43]
    hover:via-[#e43d61]
    hover:to-[#ff5c75]
    shadow-[0_12px_28px_rgba(227,52,74,0.30)]
  `,

  secondary: `
    border border-[#E3344A]
    bg-white
    text-[#E3344A]
    hover:bg-gradient-to-r
    hover:from-[#D90621]
    hover:via-[#EE3344]
    hover:to-[#ff6b81]
    hover:text-white
    shadow-[0_8px_20px_rgba(227,52,74,0.10)]
  `,
};

const baseStyles = `
  inline-flex items-center justify-center
  rounded-full
  px-7 py-3
  text-sm
  font-semibold
  tracking-[0.04em]
  transition-all duration-300
  hover:-translate-y-0.5
  hover:shadow-xl
  active:scale-[0.98]
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