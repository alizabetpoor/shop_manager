import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Components/Product/Product";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([
    // { id: 1, name: "لبنیات" },
    // { id: 2, name: "تنقلات" },
  ]);
  const { addToast } = useToasts();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [filtered, setFiltered] = useState(products);
  const [searchText, setSearchText] = useState("");
  const selectHandler = (e) => {
    setSelectedGroup(e);
  };
  const options = groups.map((group) => {
    return { value: group.name, label: group.name };
  });
  options.unshift({ value: "all", label: "همه دسته ها" });

  const filterProduct = () => {
    let filterProducts = null;
    if (selectedGroup) {
      if (selectedGroup.value === "all") {
        filterProducts = [...products];
      } else {
        filterProducts = products.filter(
          (product) => product.group === selectedGroup.value
        );
      }
    } else {
      filterProducts = [...products];
    }
    filterProducts = filterProducts.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(filterProducts);
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
    filterProduct();
  }, [searchText, selectedGroup]);

  useEffect(() => {
    setFiltered(products);
    filterProduct();

    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const searchTextHadnler = (value) => {
    setSearchText(value);
  };
  const deleteHandler = (productid) => {
    const newProducts = products.filter((product) => product.id !== productid);
    setProducts(newProducts);
    addToast("کالا مورد نظر حذف شد", { appearance: "info", autoDismiss: true });
  };
  const countHandler = (productid, operator) => {
    const index = products.findIndex((product) => product.id === productid);
    const cloneProducts = [...products];
    const product = cloneProducts[index];
    if (operator === "plus") {
      product.count++;
    } else {
      product.count--;
    }
    setProducts(cloneProducts);
  };

  return (
    <div className="homepage flex flex-col space-y-3 ">
      <div className="flex items-center space-x-2 space-x-reverse">
        <input
          className="border-2 p-2 w-3/4 rounded-lg focus:ring-2 outline-none ring-purple-400 focus:border-transparent"
          type="search"
          placeholder="نام کالا ..."
          value={searchText}
          onChange={(e) => searchTextHadnler(e.target.value)}
        />
        <Select
          className="w-1/4"
          placeholder="دسته بندی"
          value={selectedGroup}
          onChange={selectHandler}
          defaultValue={options[0]}
          options={options}
          noOptionsMessage={({ inputValue }) =>
            !inputValue ? null : "دسته بندی پیدا نشد"
          }
        />
      </div>

      <table className="products flex flex-col bg-green-300 rounded-lg">
        <thead>
          <tr className="grid grid-cols-4 text-center p-2 bg-green-700 text-white">
            <th>نام کالا</th>
            <th>دسته بندی</th>
            <th>تعداد</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!products.length && (
            <tr className="flex flex-col justify-center items-center h-28">
              <td>
                <p className="flex flex-col justify-center items-center ">
                  هیچ محصولی وجود ندارد
                  <Link
                    to="/addproduct"
                    className="px-4 py-1 mt-1 bg-purple-600 hover:bg-purple-400 text-white hover:text-black transition ring-2 ring-purple-300 rounded-xl"
                  >
                    اضافه کردن محصول
                  </Link>
                </p>
              </td>
            </tr>
          )}
          {products.length && filtered.length === 0 ? (
            <tr className="flex flex-col justify-center items-center h-28">
              <td>
                <p className="flex flex-col justify-center items-center ">
                  محصول مورد نظر شما پیدا نشد
                  <Link
                    to="/addproduct"
                    className="px-4 py-1 mt-1 bg-purple-600 hover:bg-purple-400 text-white hover:text-black transition ring-2 ring-purple-300 rounded-xl"
                  >
                    اضافه کردن محصول
                  </Link>
                </p>
              </td>
            </tr>
          ) : null}
          {filtered.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                deleteHandler={deleteHandler}
                countHandler={countHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
