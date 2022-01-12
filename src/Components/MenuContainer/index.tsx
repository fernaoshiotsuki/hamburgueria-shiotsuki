import { useEffect } from "react";
import { UseApi } from "../../Providers/ApiProvider/indes";

const MenuContainer = () => {
  const { menu, getProducts } = UseApi();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        {menu?.map((item) => {
          return item.name;
        })}
      </div>
    </div>
  );
};
