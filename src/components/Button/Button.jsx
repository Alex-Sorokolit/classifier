import React from "react";
import {
  StyledButton,
  StyledBack,
  StyledSearch,
  StyledCloseButton,
  StyledIconButton,
} from "./Button.styled";

export const Button = ({
  type = "button",
  disabled = false,
  icon: Icon = null,
  children,
  onClick,
  role,
}) => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} role={role}>
      {children}
      {Icon && <Icon size={14} />}
    </StyledButton>
  );
};
export const BackButton = ({
  type = "button",
  disabled = false,
  icon: Icon = null,
  children,
  onClick,
}) => {
  return (
    <StyledBack type={type} disabled={disabled} onClick={onClick}>
      {Icon && <Icon size={14} />}
      {children}
    </StyledBack>
  );
};

export const SearchButton = ({
  type = "button",
  disabled = false,
  icon: Icon = null,
  children,
  onClick,
}) => {
  return (
    <StyledSearch type={type} disabled={disabled} onClick={onClick}>
      {Icon && <Icon size={14} />}
      {children}
    </StyledSearch>
  );
};

export const CloseButton = ({
  type = "button",
  disabled = false,
  icon: Icon = null,
  children,
  onClick,
}) => {
  return (
    <StyledCloseButton type={type} disabled={disabled} onClick={onClick}>
      {children} {Icon && <Icon size={14} />}
    </StyledCloseButton>
  );
};
export const IconButton = ({
  type = "button",
  disabled = false,
  icon: Icon = null,
  children,
  onClick,
  visibility,
  position,
  variant,
  tooltip,
}) => {
  return (
    <StyledIconButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      visibility={visibility}
      position={position}
      variant={variant}
      tooltip={tooltip}
    >
      <div>
        {children} {Icon && <Icon size={24} />}
        {tooltip && <span className="tooltip">{tooltip}</span>}
      </div>
    </StyledIconButton>
  );
};
