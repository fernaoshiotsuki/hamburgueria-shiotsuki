import { InputHTMLAttributes } from "react";

interface SearchInput extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
}
const Input = ({ placeholder, label, ...rest }: SearchInput) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input placeholder={placeholder} {...rest}></input>
    </>
  );
};
export default Input;
