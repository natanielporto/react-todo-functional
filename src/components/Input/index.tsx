import { ChangeEvent } from "react";

interface Input {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({ placeholder, value, onChange }: Input) => {
  return <input placeholder={placeholder} onChange={onChange} value={value} />;
};
