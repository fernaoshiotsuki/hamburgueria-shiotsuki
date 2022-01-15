import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Header from "../../Components/Header/inde";
import MenuContainer from "../../Components/MenuContainer";
import { UseApi } from "../../Providers/ApiProvider/indes";

const DashBoard = () => {
  const {
    userRegister,
    userLogin,
    addProduct,
    removeProduct,
    getProducts,
    cart,
  } = UseApi();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Flex direction="column">
      <Flex direction="row">
        <Header />
      </Flex>
      <Flex direction="row" overflowX="scroll" h="400px">
        <MenuContainer />
      </Flex>
    </Flex>
  );
};
export default DashBoard;
