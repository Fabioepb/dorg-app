interface SupplyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

const StyledButton = ({
  onClick,
  className = "",
  children,
  danger = false,
  ...props
}: SupplyButtonProps) => {
  return (
    <button
      title={props.disabled ? "Disabled" : props.title}
      className={`bg-light-accent border border-accent drop-shadow-accent drop-shadow-md rounded-lg py-3 px-3  ease-in-out delay-25 duration-300 text-white text-sm font-medium  transition-colors  ${props.disabled ? "opacity-50  hover:bg-light-accent!" : `cursor-pointer hover:bg-gradient-to-b  hover:text-black hover:font-bold ${danger ? "hover:from-red-500 hover:via-orange-500 hover:to-yellow-500" : "hover:from-red-500 hover:via-yellow-500 hover:to-green-500"}`} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default StyledButton;
