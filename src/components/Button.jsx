export const Button = ({ className, dataTheme, onClick, children }) => {
  return (
    <button className={className} data-theme={dataTheme} onClick={onClick}>
      {children}
    </button>
  );
};
