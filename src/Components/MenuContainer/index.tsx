import { Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../Providers/ApiProvider/indes";

const MenuContainer = () => {
  const { menu, addProduct } = useContext(ApiContext);

  useEffect(() => {
    console.log(menu);
  }, [menu]);

  return (
    <>
      {menu?.map((item) => {
        return (
          <Container
            textAlign="start"
            border="3px solid"
            borderColor="gray.20"
            _hover={{ borderColor: "green.100", button: "bgColor: green.100" }}
            borderRadius="5px"
            direction="column"
            p="0"
            h="346px "
            w={["290px", "290px", "290px", "22%"]}
            margin="10px"
            key={item.id}
          >
            <Flex
              w="286px"
              maxW="100%"
              bgColor="gray.20"
              alignItems="center"
              justifyContent="center"
            >
              <Image boxSize="177px" maxWidth="177px" src={item.img} />
            </Flex>
            <Text margin="10px" fontSize="18px" fontWeight="600">
              {item.name}
            </Text>
            <Text margin="10px" fontSize="12px" color="gray.30">
              {item.type}
            </Text>
            <Text
              margin="10px"
              color="green.100"
              fontSize="14px"
              fontWeight="600"
            >
              R$ {item.price}
            </Text>
            <Button
              margin="10px"
              side="md"
              color="gray.10"
              bgColor="gray.20"
              _hover={{ bgColor: "green.100" }}
              onClick={() => addProduct(item)}
            >
              Adicionar
            </Button>
          </Container>
        );
      })}
    </>
  );
};
export default MenuContainer;
