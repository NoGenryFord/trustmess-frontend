export const Button = ({
  className,
  dataTheme,
  onClick,
  children,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={className}
      data-theme={dataTheme}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};
