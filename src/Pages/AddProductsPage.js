import { useEffect, useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
const AddProductsPage = () => {
  const [product, setProduct] = useState({ name: "", count: 0 });
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { addToast } = useToasts();
  const options = groups.map((group) => {
    return { value: group.name, label: group.name };
  });
  const productHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductHandler = () => {
    if (product.name !== "" && product.count >= 1 && selectedGroup) {
      const newproduct = {
        id: Math.floor(Math.random() * 1000),
        name: product.name,
        count: Number(product.count),
        group: selectedGroup.value,
      };
      const cloneProducts = [...products];
      const existProduct = cloneProducts.find(
        (product) =>
          product.name === newproduct.name && product.group === newproduct.group
      );
      if (existProduct) {
        const addToExistProduct = existProduct;
        addToExistProduct.count += newproduct.count;
        const newProducts = cloneProducts.filter(
          (product) => product.name !== addToExistProduct.name
        );
        newProducts.push(addToExistProduct);
        setProducts(newProducts);
        addToast("کالای شما آپدیت شد", {
          appearance: "info",
          autoDismiss: true,
        });
      } else {
        cloneProducts.push(newproduct);

        setProducts(cloneProducts);
        addToast("کالای شما اضافه شد", {
          appearance: "success",
          autoDismiss: true,
        });
      }

      setSelectedGroup(null);
      setProduct({ name: "", count: 0 });
    }
  };
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    const groups = JSON.parse(localStorage.getItem("groups"));
    if (products) {
      setProducts(products);
    }
    if (groups) {
      setGroups(groups);
    }
  }, []);
  useEffect(() => {
    if (products.length) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  return (
    <div className="addproduct-page bg-green-400 h-36 flex flex-col items-center rounded-md justify-center px-2">
      <div className="add-product-section grid grid-cols-4 p-3 gap-2">
        <input
          className="rounded-lg p-1 focus:outline-none focus:ring ring-purple-400"
          name="name"
          onChange={productHandler}
          type="text"
          value={product.name}
          placeholder="نام کالا"
        />
        <input
          className="rounded-lg p-1 focus:outline-none focus:ring ring-purple-400"
          name="count"
          onChange={productHandler}
          type="number"
          value={product.count}
          placeholder="تعداد کالا"
        />
        <Select
          value={selectedGroup}
          className="rounded-lg"
          options={options}
          onChange={(e) => setSelectedGroup(e)}
          placeholder="دسته بندی"
          noOptionsMessage={({ inputValue }) =>
            !inputValue ? null : "دسته بندی پیدا نشد"
          }
        />
        <button
          onClick={addProductHandler}
          className="bg-purple-500 hover:bg-purple-600 transition text-white rounded-xl"
        >
          اضافه کردن کالا
        </button>
      </div>
      <div className="errors self-start">
        <div className="flex items-center space-x-2 space-x-reverse">
          {product.name !== "" ? (
            <BiCheckCircle className="h-5 w-5 text-green-700" />
          ) : (
            <BiErrorCircle className="h-5 w-5 text-red-700" />
          )}

          <p
            className={`${
              product.name !== "" ? "text-green-800" : "text-red-700"
            }`}
          >
            نام کالا را وارد کنید
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          {product.count >= 1 ? (
            <BiCheckCircle className="h-5 w-5 text-green-700" />
          ) : (
            <BiErrorCircle className="h-5 w-5 text-red-700" />
          )}

          <p
            className={`${
              product.count >= 1 ? "text-green-800" : "text-red-700"
            }`}
          >
            تعداد کالا باید بیشتر از 0 باشد
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          {selectedGroup ? (
            <BiCheckCircle className="h-5 w-5 text-green-700" />
          ) : (
            <BiErrorCircle className="h-5 w-5 text-red-700" />
          )}

          <p className={`${selectedGroup ? "text-green-800" : "text-red-700"}`}>
            دسته بندی را انتخاب کنید
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProductsPage;
