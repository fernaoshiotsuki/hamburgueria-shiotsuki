import { Input } from "@chakra-ui/react";
import React, { InputHTMLAttributes, SetStateAction, useState } from "react";
import { json } from "stream/consumers";
import { UseApi } from "../../Providers/ApiProvider/indes";
import Cart from "../Cart";

interface Input {
  input: string;
}

interface DisplayCart {
  inDisplay: boolean;
  setInDisplay?: React.Dispatch<SetStateAction<boolean>>;
}
const Header = () => {
  const { menu, getProducts, filteredMenu } = UseApi();
  const [inDisplay, setInDisplay] = React.useState(false);
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const search = menu.filter((item) => {
      return Object.values(item).includes(input);
    });
    filteredMenu(search);
    localStorage.setItem("menu", JSON.stringify(search));

    if (search.length === 0) {
      getProducts();
    }
  };
  console.log("se");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const Displayed = () => {
    setInDisplay((inDisplay) => !inDisplay);
  };

  window.addEventListener("storage", () => {
    window.location.reload();
  });

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        ></Input>
        <button onClick={() => handleSearch()}>search</button>
      </form>
      <button onClick={() => Displayed()}>Cart</button>
      <button>LogOut</button>
      {inDisplay && <Cart Displayed={Displayed} />}
    </header>
  );
};
export default Header;
