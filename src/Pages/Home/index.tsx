import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
interface UserData {
  email: string;
  password: string;
}
const Home = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Digite seu email para cadastrar")
      .email("Digite um Email valido"),
    password: yup
      .string()
      .required("Digite uma senha")
      .min(6, "Sua senha precisa ter min 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserData) => {
    axios.get("http://localhost:3001/login", { data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")}></input>
        <input {...register("password")} type="password"></input>
        <button type="submit">Logar</button>
      </form>
    </div>
  );
};
export default Home;
