import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const CARD_VARIANTS = {
  default: "glass-card",
  elevated: "bg-dark-300 shadow-xl hover:shadow-2xl transition-shadow",
  outline: "border border-white/10 bg-transparent",
  gradient:
    "bg-gradient-to-br from-primary-500/10 to-purple-500/10 backdrop-blur-lg",
};

const CARD_PADDING = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

const Card = forwardRef(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      clickable = false,
      children,
      className = "",
      onClick,
      ...props
    },
    ref,
  ) => {
    const cardClasses = [
      "rounded-2xl",
      CARD_VARIANTS[variant],
      CARD_PADDING[padding],
      hoverable &&
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
      clickable && "cursor-pointer active:scale-[0.98]",
      className,
    ].join(" ");

    const Component = clickable ? motion.button : motion.div;

    return (
      <Component
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        whileHover={hoverable ? { y: -4 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = "Card";

Card.propTypes = {
  variant: PropTypes.oneOf(["default", "elevated", "outline", "gradient"]),
  padding: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Card);
