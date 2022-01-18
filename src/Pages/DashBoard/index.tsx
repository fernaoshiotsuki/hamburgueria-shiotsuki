import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Header from "../../Components/Header/inde";
import MenuContainer from "../../Components/MenuContainer";
import { UseApi } from "../../Providers/ApiProvider/indes";

const DashBoard = () => {
  const { getProducts } = UseApi();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Flex direction="column" alignItems="center">
      <Flex direction={["row", "row", "column", "column"]} h="80px">
        <Header />
      </Flex>

      <Flex
        direction="row"
        overflowX={["scroll", "scroll", "scroll", "scroll"]}
        flexWrap={["nowrap", "nowrap", "nowrap", "wrap", "wrap"]}
        justifyContent={[null, null, null, "center"]}
        alignItems="center"
        h={["400px", "450px", "500px", "800px"]}
        w="100vw"
        maxW="1300px"
      >
        <MenuContainer />
      </Flex>
    </Flex>
  );
};
export default DashBoard;
