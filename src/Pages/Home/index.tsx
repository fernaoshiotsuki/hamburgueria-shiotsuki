import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface UserData {
  data?: object;
  email: string;
  password: string;
}

const Home = () => {
  const [token, setToken] = useState([]);
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
    console.log(data);

    axios.post("http://localhost:3001/login", data).then((res) => {
      console.log(res.data);
    });
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
