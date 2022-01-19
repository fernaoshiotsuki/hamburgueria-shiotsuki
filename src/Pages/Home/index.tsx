import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { RiShoppingBag3Line } from "react-icons/ri";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/";
interface UserData {
  data?: object;
  email: string;
  password: string;
}
interface JWT {
  sub: string;
}

const Home = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Digite seu email")
      .email("Digite um Email valido"),
    password: yup
      .string()
      .required("Digite sua senha")
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
    axios
      .post("https://json-server-hamburgueriakenzie.herokuapp.com/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
      })
      .then(() => {
        const decodedId = jwtDecode(localStorage.getItem("token") || "");
        const userId = (decodedId as JWT).sub;

        localStorage.setItem("userId", userId);

        navigate("/dashBoard");
      })
      .catch((err) => {
        toast.error("Email e/ou Senha invalidos! :(");
      });
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
      <Toaster position="top-right" reverseOrder={false} />
      <Flex direction={"column"} marginBottom={["0", "0", "20px", "50px"]}>
        <Flex h={["10vh", "12vh", "15vh", "15vh"]} alignItems="center">
          <Text fontSize="4xl" fontWeight="600" p="1">
            Burguer
          </Text>
          <Text color="red.22" fontSize="xl" fontWeight="600" marginTop="10px">
            Kenzie
          </Text>
        </Flex>
        <Container
          h={["80px", "95px", "95px", "95px"]}
          display="flex"
          flexDirection="row"
          alignItems="center"
          border="solid 1px "
          borderRadius="3px"
          borderColor="gray.20"
          w={["320px", "377px", "377px", "377px"]}
        >
          <Container
            bgColor="#27ae6047"
            borderRadius="3px"
            display="flex"
            justifyContent="start"
            alignContent="center"
            maxH="60px"
            height="60px"
            maxWidth="60px"
          >
            <Icon w={10} h={10} alignSelf="center" justifySelf="center">
              <RiShoppingBag3Line />
            </Icon>
          </Container>
          <Text fontSize="14px">
            A vida é como um sanduiche, é preciso recheá-la com os melhores
            ingredientes
          </Text>
        </Container>
      </Flex>

      <Flex>
        <FormControl
          h={["420px", "420px", "465px", "470px"]}
          w={["320px", "377px", "377px", "500px"]}
          margin={"10px"}
          border="solid 2px"
          borderColor="gray.20"
          borderRadius="3px"
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
              p="6"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <Text fontSize="11px" zIndex="1" color="red.22">
              {errors.email?.message}
            </Text>
            <Input
              border="2px"
              borderColor="gray.40"
              m="10px"
              w="90%"
              p="6"
              placeholder="Senha"
              {...register("password")}
              type="password"
            />
            <Text fontSize="11px" zIndex="1" color="red.22">
              {errors.password?.message}
            </Text>
            <Stack alignItems="center">
              <Button
                m="10px"
                p="6"
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
                p="6"
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
