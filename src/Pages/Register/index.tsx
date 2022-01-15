import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as CSS from "csstype";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  data?: object;
}
const Register = () => {
  const navigate = useNavigate();

  const style: CSS.Properties = {
    width: "10px",
    height: "10px",
  };
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
    axios
      .post("http://localhost:3001/register", data)
      .then((res) => console.log(res.data))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  let circle = [];
  for (let i = 0; i < 20; i++) {
    circle[i] = <div color="gray.20" className="cicles"></div>;
  }

  let divs = document.getElementsByClassName("circles");

  return (
    <Flex
      overflowY="scroll"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent={["center", "center", "space-evenly", "space-evenly"]}
      direction={["column", "column", "row", "row"]}
    >
      <Flex direction={"column"} display={["none", "none", "none", "flex"]}>
        <Flex h="15vh" alignItems="center">
          <Text fontSize="4xl" fontWeight="600" p="1">
            Burguer
          </Text>
          <Text color="red.22" fontSize="xl" fontWeight="600" marginTop="10px">
            Kenzie
          </Text>
        </Flex>
        <Container
          h="95px"
          border="solid 1px "
          borderRadius="3px"
          borderColor="gray.20"
          w={["377px"]}
        >
          <Text fontSize="14px">
            A vida é como um sanduiche, é preciso recheá-la com os melhores
            ingredientes
          </Text>
        </Container>
        <Container>{circle}</Container>
      </Flex>

      <Flex>
        <FormControl
          h="461px"
          w={["377px", "377px", "377px", "500px"]}
          margin={"10px"}
          border="solid 2px"
          borderColor="gray.20"
          borderRadius="3px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormLabel p="3" fontWeight="600" fontSize="18px" htmlFor="email">
            Cadastro{" "}
            <Text fontSize="14px" as="u" marginLeft="220px" color="gray.30">
              <Link rel="stylesheet" to="/">
                Retornar para o Login
              </Link>
            </Text>
          </FormLabel>
          <Input
            border="2px"
            borderColor="gray.40"
            m="10px"
            w="90%"
            p="7"
            type="email"
            placeholder="Nome"
            {...register("name")}
          />
          <Input
            border="2px"
            borderColor="gray.40"
            m="10px"
            w="90%"
            p="7"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <Input
            border="2px"
            borderColor="gray.40"
            m="10px"
            w="90%"
            p="7"
            type="email"
            placeholder="Senha"
            {...register("password")}
          />
          <Input
            border="2px"
            borderColor="gray.40"
            m="10px"
            w="90%"
            p="7"
            placeholder="Confirmar Senha"
            {...register("confirmPassword")}
            type="password"
          />

          <Stack alignItems="center">
            <Button
              m="10px"
              p="7"
              w="90%"
              color="gray.10"
              bgColor="green.100"
              type="submit"
            >
              Logar
            </Button>
          </Stack>
        </FormControl>
      </Flex>
    </Flex>
  );
};
export default Register;

{
  /* <div>
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("name")}></input>
  <input {...register("email")}></input>
  <input {...register("password")} type="password"></input>
  <input {...register("confirmPassword")} type="password"></input>
  <button type="submit">Cadastrar</button>
</form>
</div> */
}
