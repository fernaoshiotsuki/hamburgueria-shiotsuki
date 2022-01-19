import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface childrenProps {
  children: ReactNode;
}

interface JWT {
  sub: string;
}

interface Product {
  name: string;
  price: string;
  id?: string;
  type: string;
  img: string;
  search?: object;
}

interface ApiProviderData {
  menu: Product[];
  cart: Product[];

  filteredMenu: (search: Product[]) => void;
  getProducts: () => void;
  cartProducts: () => void;
  addProduct: (product: Product) => void;
  excludeProduct: (name: string) => void;
  removeProduct: (id: string) => void;
}
export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);
export const ApiProvider = ({ children }: childrenProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [menu, setMenu] = useState<Product[]>([]);

  const getProducts = () => {
    axios
      .get("https://json-server-hamburgueriakenzie.herokuapp.com/products")
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

  const cartProducts = () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://json-server-hamburgueriakenzie.herokuapp.com/cart/?userId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = (product: Product) => {
    const token = localStorage.getItem("token") || "";
    const decodedId = jwtDecode(localStorage.getItem("token") || "");
    const userId = (decodedId as JWT).sub;
    axios
      .post(
        "https://json-server-hamburgueriakenzie.herokuapp.com/cart",
        { ...product, userId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => console.log(res.data))
      .then(() => {
        cartProducts();
      })
      .catch((err) => console.log(err));
  };

  const removeProduct = (id: string) => {
    const token = localStorage.getItem("token") || "";
    console.log(id);
    axios
      .delete(
        `https://json-server-hamburgueriakenzie.herokuapp.com/cart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);

        cartProducts();
      })
      .catch((err) => {
        cartProducts();
        console.log(err);
      });
  };

  const excludeProduct = (name: string) => {
    const filteredList = cart
      .filter((item, i) => {
        return item.name === name;
      })
      .map((item) => {
        return item.id;
      });

    console.log(filteredList);
    filteredList.map((id) => {
      console.log(id);
      return removeProduct(id || "");
    });
  };

  useEffect(() => {
    cartProducts();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        addProduct,
        removeProduct,
        getProducts,
        cartProducts,
        cart,
        menu,
        filteredMenu,
        excludeProduct,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const UseApi = () => useContext(ApiContext);
