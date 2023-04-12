interface Props {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function Button({ text, type, onClick }: Props) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
}
