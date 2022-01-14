import { Flex } from "@chakra-ui/react";
import { boolean } from "yup/lib/locale";
import { UseApi } from "../../Providers/ApiProvider/indes";

interface DisplayState {
  Displayed: () => void;
}

const Cart = ({ Displayed }: DisplayState) => {
  const { cart, removeProduct } = UseApi();

  return (
    <Flex direction="column">
      <div>
        {cart?.map((prod) => {
          return (
            <>
              <div>
                <button onClick={() => Displayed()}>X</button>
                <img src={prod.img}></img>
                <h3>{prod.name}</h3>
                <p>{prod.price}</p>
                <button onClick={() => removeProduct(prod)}>Remover</button>
              </div>
            </>
          );
        })}
      </div>
    </Flex>
  );
};

export default Cart;
