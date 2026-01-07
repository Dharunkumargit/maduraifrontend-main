import React from "react";

const Button = ({
  onClick,
  button_icon,
  button_name,
  bgColor,
  textColor,
  paddingX,
  paddingY,
}) => {
  const bgClass = bgColor ? `${bgColor}` : "bg-darkest-blue";
  const textClass = textColor ? `${textColor}` : "text-white";
  const paddingXClass = paddingX ? `${paddingX}` : "px-4";
  const paddingYClass = paddingY ? `${paddingY}` : "py-3";
  return (
    <div>
      <p
        onClick={onClick}
        className={` cursor-pointer  w-fit  text-sm flex items-center rounded-lg  gap-2 
      ${bgClass} ${textClass} ${paddingXClass} ${paddingYClass} `}
      >
        {button_icon}
        {button_name}
      </p>
    </div>
  );
};

export default Button;
