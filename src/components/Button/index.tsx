export const Button = ({
  text,
  type,
  onClick,
}: {
  text: string;
  type?: "submit";
  onClick?: () => void;
}) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};
