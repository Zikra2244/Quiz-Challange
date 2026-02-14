import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const BUTTON_VARIANTS = {
  primary: {
    className: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  },
  secondary: {
    className: "glass text-[var(--color-text)] hover:bg-[var(--color-glass-hover)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  },
  outline: {
    className: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  },
  ghost: {
    className: "text-[var(--color-textSecondary)] bg-transparent hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  },
  success: {
    className: "bg-gradient-to-r from-[var(--color-success)] to-emerald-600 text-white hover:shadow-lg hover:shadow-[var(--color-success)]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  },
  danger: {
    className: "bg-gradient-to-r from-[var(--color-error)] to-pink-600 text-white hover:shadow-lg hover:shadow-[var(--color-error)]/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
  }
};

const BUTTON_SIZES = {
  xs: "px-3 py-1.5 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl"
};

const Button = forwardRef(({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
  ...props
}, ref) => {
  const variantStyles = BUTTON_VARIANTS[variant]?.className || BUTTON_VARIANTS.primary.className;
  const sizeStyles = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  
  const buttonClasses = [
    "relative rounded-full font-semibold transition-all duration-300",
    "flex items-center justify-center gap-2",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]",
    variantStyles,
    sizeStyles,
    fullWidth ? "w-full" : "",
    className
  ].join(" ");

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.95 } : undefined}
      aria-label={ariaLabel || (typeof children === "string" ? children : "button")}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost", "success", "danger"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  ariaLabel: PropTypes.string
};

export default React.memo(Button);
