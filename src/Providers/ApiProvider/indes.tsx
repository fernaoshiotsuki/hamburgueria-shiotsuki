import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface childrenProps {
  children: ReactNode;
}
interface UserData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

interface UserToken {
  token: string;
}

interface Product {
  name: string;
  price: string;
  id: string;
  type: string;
  img: string;
  search?: object;
}

interface ApiProviderData {
  menu: Product[];
  cart: Product[];
  filteredMenu: (search: Product[]) => void;
  userRegister: (data: UserData) => void;
  userLogin: (data: UserData) => void;
  getProducts: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}
export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);

export const ApiProvider = ({ children }: childrenProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [menu, setMenu] = useState<Product[]>([]);
  const userRegister = (data: UserData) => {
    axios
      .post("http//localhost:3001/register", { data })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  };

  const userLogin = (data: UserData) => {
    axios
      .post("http//localhost:3001/login", { data })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getProducts = () => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        console.log(res.data);
        setMenu(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filteredMenu = (search: Product[]) => {
    setMenu((old) => search);
    console.log(search);
  };

  const addProduct = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeProduct = (product: Product) => {
    const newCartList = cart.filter((item) => {
      return item.name !== product.name;
    });
    setCart(newCartList);
  };
  console.log(getProducts);
  return (
    <ApiContext.Provider
      value={{
        userRegister,
        userLogin,
        addProduct,
        removeProduct,
        getProducts,
        cart,
        menu,
        filteredMenu,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const UseApi = () => useContext(ApiContext);
