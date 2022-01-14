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
    <div>
      <Header />
      <MenuContainer />
    </div>
  );
};
export default DashBoard;
