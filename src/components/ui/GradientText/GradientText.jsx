import React from "react";
import PropTypes from "prop-types";

const GradientText = ({
  as: Component = "span",
  gradient = "primary",
  animate = false,
  children,
  className = "",
  ...props
}) => {
  const gradientClasses = [
    "bg-clip-text text-transparent",
    animate && "animate-gradient",
    className
  ].join(" ");

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, var(--color-${gradient === "primary" ? "primary" : "secondary"}), var(--color-${gradient === "primary" ? "secondary" : "primary"}))`
  };

  return (
    <Component className={gradientClasses} style={gradientStyle} {...props}>
      {children}
    </Component>
  );
};

GradientText.propTypes = {
  as: PropTypes.elementType,
  gradient: PropTypes.oneOf(["primary", "secondary"]),
  animate: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default React.memo(GradientText);
