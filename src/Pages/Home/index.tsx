import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UseApi } from "../../Providers/ApiProvider/indes";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
interface UserData {
  data?: object;
  email: string;
  password: string;
}

const Home = () => {
  const { getProducts } = UseApi();
  const navigate = useNavigate();
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

    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.accessToken);

        localStorage.setItem("token", res.data.accessToken);
      })
      .then(() => {
        navigate("/dashBoard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      overflowY="scroll"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent={["center", "center", "space-evenly", "space-evenly"]}
      direction={["column", "column", "row-reverse", "row-reverse"]}
    >
      <Flex direction={"column"}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel p="3" fontWeight="600" htmlFor="email">
              Login
            </FormLabel>
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
              placeholder="Senha"
              {...register("password")}
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
              <Text fontSize="14px" color="gray.30" p="3">
                Crie uma conta para saborear muitas delícias e matar sua fome!
              </Text>
              <Button
                m="10px"
                p="7"
                w="90%"
                color="gray.30"
                onClick={() => navigate("/register")}
              >
                Cadastrar-se
              </Button>
            </Stack>
          </form>
        </FormControl>
      </Flex>
    </Flex>
  );
};
export default Home;
