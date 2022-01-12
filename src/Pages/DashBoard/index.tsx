import { UseApi } from "../../Providers/ApiProvider/indes";
// interface ApiProviderData {
//     cart: Product[];
//     userRegister: (data: UserData) => void;
//     userLogin: (data: UserData) => void;
//     getProducts: () => void;
//     addProduct: (product: Product) => void;
//     removeProduct: (product: Product) => void;
//   }

const DashBoard = () => {
  const {
    userRegister,
    userLogin,
    addProduct,
    removeProduct,
    getProducts,
    cart,
  } = UseApi();
};
