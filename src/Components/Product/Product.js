import { BiTrash, BiPlusCircle, BiMinusCircle } from "react-icons/bi";

const Product = ({ product, deleteHandler, countHandler }) => {
  return (
    <tr className="product grid grid-cols-4 text-center p-2">
      <td>{product.name}</td>
      <td>{product.group}</td>
      <td className="flex justify-center items-center space-x-2 space-x-reverse">
        <BiPlusCircle
          onClick={() => countHandler(product.id, "plus")}
          className="cursor-pointer text-green-800 w-5 h-5"
        />
        <span>{product.count}</span>
        {product.count > 1 ? (
          <BiMinusCircle
            onClick={() => countHandler(product.id, "minus")}
            className="cursor-pointer text-red-600 w-5 h-5"
          />
        ) : null}
      </td>
      <td className="flex justify-center items-center">
        <BiTrash
          onClick={() => deleteHandler(product.id)}
          className="h-7 w-7 rounded-lg border-2 text-red-500 border-red-500 cursor-pointer p-1"
        />
      </td>
    </tr>
  );
};

export default Product;
