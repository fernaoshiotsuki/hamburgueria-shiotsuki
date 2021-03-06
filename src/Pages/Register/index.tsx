import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiShoppingBag3Line } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import { toast, Toaster } from "react-hot-toast";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  data?: object;
}
const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Digite seu nome de user"),
    email: yup
      .string()
      .required("Digite seu email para cadastrar")
      .email("Digite um Email valido"),
    password: yup
      .string()
      .required("Digite uma senha")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha precisa ter min 8 caracteres, sendo um Maiusculo, um numero e um especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "confirmação não está identica"),
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
      .post(
        "https://json-server-hamburgueriakenzie.herokuapp.com/register",
        data
      )
      .then((res) => toast.success(`Cadastrado com sucesso, ${data.name}`))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      overflowY="scroll"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent={["center", "center", "space-evenly", "space-evenly"]}
      direction={["column", "column", "row", "row"]}
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
          h={["441px", "471px", "478px", "461px"]}
          w={["320px", "377px", "377px", "500px"]}
          margin={"10px"}
          border="solid 2px"
          borderColor="gray.20"
          borderRadius="3px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel p="3" fontWeight="600" fontSize="18px" htmlFor="email">
              Cadastro{" "}
              <Text
                fontSize={["11px", "11px", "14px", "14px"]}
                position="relative"
                left="60%"
                marginBotton="50px"
                color="gray.30"
              >
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
              p="5"
              placeholder="Nome"
              {...register("name")}
            />
            <Text fontSize="11px" zIndex="1" color="red.22">
              {errors.name?.message}
            </Text>
            <Input
              border="2px"
              borderColor="gray.40"
              m="10px"
              w="90%"
              p="5"
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
              p="5"
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            <Text fontSize="10px" zIndex="1" color="red.22">
              {errors.password?.message}
            </Text>
            <Input
              border="2px"
              borderColor="gray.40"
              m="10px"
              w="90%"
              p="5"
              placeholder="Confirmar Senha"
              {...register("confirmPassword")}
              type="password"
            />
            <Text fontSize="11px" zIndex="1" color="red.22">
              {errors.confirmPassword?.message}
            </Text>
            <Stack alignItems="center">
              <Button
                m="10px"
                p="5"
                w="90%"
                color="gray.10"
                bgColor="green.100"
                type="submit"
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        </FormControl>
      </Flex>
    </Flex>
  );
};
export default Register;
