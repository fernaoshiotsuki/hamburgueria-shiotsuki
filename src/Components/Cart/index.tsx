import { Button, Container, Flex, Image, Text } from "@chakra-ui/react";

import { useEffect } from "react";
import { UseApi } from "../../Providers/ApiProvider/indes";
import { GoTrashcan } from "react-icons/go";
interface DisplayState {
  Displayed: () => void;
}

const Cart = ({ Displayed }: DisplayState) => {
  const { cart, removeProduct, addProduct, excludeProduct, cartProducts } =
    UseApi();

  const lancheNames = cart.map((i) => {
    return i.name;
  });

  let lanches = [];
  let lanchesNum: any = [];

  let lancheQuantity = lancheNames.reduce<Record<string, number>>(
    (initial, current) => (
      // eslint-disable-next-line no-sequences
      (initial[current] = initial[current] + 1 || 1), initial
    ),
    {}
  );

  const lancheInfo = Object.entries(lancheQuantity);

  for (let i = 0; i < lancheInfo.length; i++) {
    lanches[i] = lancheInfo[i][0];
    lanchesNum[i] = lancheInfo[i][1];
  }

  const itemsList = lanches.map((name) => {
    return cart.find((i) => {
      return i.name === name;
    });
  });

  const totalValue = () => {
    const values = cart.map((i) => {
      return i.price;
    });

    const sumPrices = values?.reduce<number>((initial, current) => {
      return (+initial || 0) + +current;
    }, 0 as number);
    return sumPrices;
  };

  const clearCart = () => {
    cart.map((i) => {
      return removeProduct(i.id || "");
    });
  };

  useEffect(() => {
    cartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      display="flex"
      justifyContent="center"
      direction="column"
      w="100vw"
      maxW="100vw"
      h="100vh"
      bgColor="#333333ad"
      position="absolute"
      zIndex="1"
    >
      <Flex
        w={["375px", "375px", "375px", "500px"]}
        bgColor="gray.10"
        h={["340px", "340px", "340px", "370px"]}
        direction="column"
        borderRadius="5px"
        marginTop="80px"
        justifyContent="space-between"
      >
        <Container
          display="flex"
          flexDirection="row-reverse"
          justifyContent="space-between"
          alignItems="center"
          h="58px"
          minHeight="58px"
          borderTopRadius="5px"
          bgColor="green.100"
          minW="100%"
          margin="0"
        >
          <Button
            color="gray.10"
            float="right"
            border="none"
            bgColor="green.100"
            onClick={() => Displayed()}
          >
            X
          </Button>
          <Text fontSize="18px" color="gray.10">
            Carrinho de compras
          </Text>
        </Container>

        <Flex direction="column" overflowY="scroll">
          {itemsList.length >= 1 ? (
            itemsList?.map((prod, i) => {
              return (
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  minHeight="100px"
                >
                  <div>
                    <Image
                      padding="3px"
                      bgColor="gray.20"
                      borderRadius="3px"
                      boxSize="57px"
                      src={prod?.img}
                    />
                  </div>
                  <div>
                    <Text fontSize="17px">{prod?.name}</Text>
                    <Container
                      border="solid 1px"
                      borderColor="gray.20"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginTop="3px"
                      p="0"
                      width="105px"
                    >
                      <Button
                        size="sm"
                        borderRadius="0px"
                        border="solid 1px"
                        borderColor="gray.20"
                        bgColor="gray.20"
                        color="red.44"
                        onClick={() => removeProduct(prod?.id || "")}
                      >
                        -
                      </Button>
                      {lanchesNum[i]}
                      <Button
                        float="right"
                        size="sm"
                        border="solid 1px"
                        borderColor="gray.20"
                        borderRadius="0px"
                        bgColor="gray.20"
                        color="red.44"
                        onClick={() =>
                          addProduct({
                            name: prod?.name || "",
                            img: prod?.img || "",
                            price: prod?.price || "",
                            type: prod?.type || "",
                          })
                        }
                      >
                        +
                      </Button>
                    </Container>
                  </div>

                  <Flex marginTop="5px">
                    <button onClick={() => excludeProduct(prod?.name || "")}>
                      <GoTrashcan size="21px" />
                    </button>
                  </Flex>
                </Flex>
              );
            })
          ) : (
            <>
              {" "}
              <Text fontSize="18px">Sua sacola está vazia</Text>
              <Text color="gray.30" marginTop="10px" fontSize="14px">
                Adicione Items
              </Text>
            </>
          )}
        </Flex>

        <Container
          alignSelf="end"
          height="100px"
          borderTop="solid 2px"
          borderColor="gray.20"
          width="90%"
        >
          <Flex
            justifyContent="space-between"
            fontSize="14px"
            color="gray.30"
            marginTop="15px"
          >
            <div>Total:</div>
            <div> R$ {totalValue().toFixed(2)} </div>
          </Flex>

          <Button
            color="gray.30"
            bgColor="gray.20"
            w="100%"
            margin="10px 0px"
            size="lg"
            onClick={() => clearCart()}
          >
            Remover Todos
          </Button>
        </Container>
      </Flex>
    </Container>
  );
};

export default Cart;
