import { useContext, useEffect } from "react";
import { ApiContext, UseApi } from "../../Providers/ApiProvider/indes";

interface Product {
  name: string;
  price: string;
  id: string;
  type: string;
  img: string;
}

const MenuContainer = () => {
  const { menu, getProducts, addProduct } = useContext(ApiContext);
  const storageMenu = localStorage.getItem("menu");
  let displayItems = undefined;

  // useEffect(() => {
  //   if (typeof storageMenu === "string") {
  //     displayItems = JSON.parse(storageMenu);
  //   }
  // }, ]);

  if (typeof storageMenu === "string") {
    displayItems = JSON.parse(storageMenu);
  }
  console.log(storageMenu);
  console.log(displayItems);
  console.log(menu);
  useEffect(() => {
    console.log(menu);
  }, [menu]);

  return (
    <div>
      {menu?.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.img} />
            <h3>{item.name}</h3>
            <p>{item.type}</p>
            <h4>{item.price}</h4>
            <button onClick={() => addProduct(item)}>Adicionar</button>
          </div>
        );
      })}
    </div>
  );
};
export default MenuContainer;
