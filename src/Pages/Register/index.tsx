import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  data?: object;
}
const Register = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .required("Digite seu email para cadastrar")
      .email("Digite um Email valido"),
    password: yup
      .string()
      .required("Digite uma senha")
      .min(6, "Sua senha precisa ter min 6 caracteres"),
    confirmPassword: yup.string().required("!match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserData) => {
    axios.post("http://localhost:3001/register", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")}></input>
        <input {...register("email")}></input>
        <input {...register("password")} type="password"></input>
        <input {...register("confirmPassword")} type="password"></input>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};
