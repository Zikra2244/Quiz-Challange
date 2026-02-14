import React from "react";
import PropTypes from "prop-types";

const CONTAINER_SIZES = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
};

const Container = ({
  size = "lg",
  center = true,
  fluid = false,
  children,
  className = "",
  ...props
}) => {
  const containerClasses = [
    "w-full px-4 sm:px-6 lg:px-8",
    !fluid && CONTAINER_SIZES[size],
    center && "mx-auto",
    className,
  ].join(" ");

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  center: PropTypes.bool,
  fluid: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default React.memo(Container);
