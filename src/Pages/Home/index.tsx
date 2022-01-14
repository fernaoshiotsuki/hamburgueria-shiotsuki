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
    <VStack>
      <Flex h="10vh">
        <h1>Burguer</h1>
        <h2 color="red.22">Kenzie</h2>
      </Flex>
      <Container h="10vh" border={"solid 2px gray"} w="90vw">
        <Text>
          A vida é como um sanduiche, é preciso recheá-la com os melhores
          ingredientes
        </Text>
      </Container>
      <FormControl
        h="79vh"
        w="90vw"
        margin={"10px"}
        border="solid 2px gray"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel htmlFor="email">Login</FormLabel>
        <Input m="10px" w="90%" p="7" type="email" {...register("email")} />
        <Input
          m="10px"
          w="90%"
          p="7"
          {...register("password")}
          type="password"
        />
        <Stack>
          <Button m="10px" p="7" type="submit">
            Logar
          </Button>
          <Button m="10px" p="7" onClick={() => navigate("/register")}>
            Cadastrar-se
          </Button>
        </Stack>
      </FormControl>
    </VStack>
  );
};
export default Home;

// <FormControl>
//   <FormLabel htmlFor="email">Email address</FormLabel>
//   <Input id="email" type="email" />
//   <FormHelperText>We'll never share your email.</FormHelperText>
// </FormControl>;
