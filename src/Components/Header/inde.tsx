import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

import { useState } from "react";
import { UseApi } from "../../Providers/ApiProvider/indes";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import Cart from "../Cart";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { menu, getProducts, filteredMenu } = UseApi();
  const [inDisplay, setInDisplay] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchInput(!searchInput);
    const search = menu.filter((item) => {
      return Object.values(item).includes(input);
    });
    filteredMenu(search);

    if (search.length === 0) {
      getProducts();
    }
  };

  let handleSearchInput = searchInput ? "block" : "none";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const Displayed = () => {
    setInDisplay((inDisplay) => !inDisplay);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Heading
      flexDirection="row"
      display="flex"
      bgColor="gray.20"
      fontSize="14px"
      w="100vw"
      h="100%"
      justifyContent={"space-around"}
    >
      <Flex
        marginTop="10px"
        alignItems="center"
        direction={"column"}
        display={[
          handleSearchInput === "block" ? "none" : "flex",
          handleSearchInput === "block" ? "none" : "flex",
          handleSearchInput === "block" ? "none" : "flex",
          "flex",
        ]}
      >
        <Flex h="37px" alignItems="center">
          <Text fontSize="4xl" fontWeight="600" p="1">
            Burguer
          </Text>
          <Text color="red.22" fontSize="xl" fontWeight="600" marginTop="10px">
            Kenzie
          </Text>
        </Flex>
      </Flex>

      <Flex alignSelf="center" minWidth={["unset", "unset", "540px", "540px"]}>
        <form onSubmit={handleSubmit}>
          <Input
            maxH="40px"
            display={[handleSearchInput, handleSearchInput, "block", "block"]}
            width={["98vw", "98vw", "350px", "370px"]}
            left="0.5%"
            alignSelf="center"
            placeholder="Digitar Pesquisa"
            bgColor="gray.20"
            borderColor="gray.30"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
        </form>
        <Button
          color="gray.10"
          bgColor="green.100"
          margin={["5px", "5px", "0px 5px", "0px 20px"]}
          right={["1%", "1%", "1%", null]}
          position={[
            handleSearchInput !== "block" ? null : "absolute",
            handleSearchInput !== "block" ? null : "absolute",
            handleSearchInput !== "block" ? null : "absolute",
            "relative",
          ]}
          onClick={() => handleSearch()}
        >
          <FaSearch />
        </Button>

        <Button
          bgColor="gray.20"
          position={"relative"}
          right="2%"
          margin={["5px", "5px", "0px 5px", "0px 20px"]}
          display={[
            handleSearchInput === "none" ? "block" : "none",
            handleSearchInput === "none" ? "block" : "none",
            handleSearchInput === "none" ? "block" : "none",
            "block",
          ]}
          onClick={() => Displayed()}
        >
          <FiShoppingCart />
        </Button>
        <Button
          bgColor="gray.20"
          margin={["5px", "5px", "0px 5px", "0px 20px"]}
          display={[
            handleSearchInput === "none" ? "block" : "none",
            handleSearchInput === "none" ? "block" : "none",
            handleSearchInput === "none" ? "block" : "none",
            "block",
          ]}
          onClick={() => handleLogOut()}
        >
          <FiLogOut />
        </Button>
      </Flex>
      {inDisplay && <Cart Displayed={Displayed} />}
    </Heading>
  );
};
export default Header;
