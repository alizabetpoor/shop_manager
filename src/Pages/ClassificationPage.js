import { BiTrash } from "react-icons/bi";
import { useToasts } from "react-toast-notifications";
import { useEffect, useState } from "react";
import "./ClassificationPage.css";
const ClassificationPage = () => {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const { addToast } = useToasts();
  const [groupSearch, setGroupSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [filtered, setFiltered] = useState(groups);
  const searchHandler = () => {
    const filteredGroups = groups.filter((group) => {
      return group.name.toLowerCase().includes(groupSearch.toLowerCase());
    });
    setFiltered(filteredGroups);
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
    setFiltered(groups);
    searchHandler();
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    searchHandler();
  }, [groupSearch]);
  const addGroupHandler = () => {
    const ExistGroup = groups.find((group) => group.name === groupName);
    if (groupName !== "") {
      if (!ExistGroup) {
        const newGroup = {
          id: Math.floor(Math.random() * 1000),
          name: groupName,
        };
        setGroups([...groups, newGroup]);
        addToast("دسته مورد نظر افزوده شد", {
          appearance: "success",
          autoDismiss: true,
        });
        setGroupName("");
      } else {
        addToast("این دسته بندی موجود میباشد", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
  const deleteGroupHandler = (id) => {
    const newGroups = groups.filter((group) => group.id !== id);
    const selectedGroup = groups.find((group) => group.id === id);
    const newProduct = products.filter(
      (product) => product.group !== selectedGroup.name
    );
    setGroups(newGroups);
    setProducts(newProduct);
    addToast("دسته مورد نظر و محصولات این دسته پاک شدند", {
      appearance: "info",
      autoDismiss: true,
    });
  };
  return (
    <div className="groups-page bg-green-400 rounded-md">
      <div className="flex flex-col items-center justify-center p-5 gap-y-3">
        <input
          className="self-stretch p-2 rounded-lg focus:outline-none focus:ring ring-purple-400"
          type="search"
          placeholder="جستجو دسته ..."
          value={groupSearch}
          onChange={(e) => setGroupSearch(e.target.value)}
        />
        <div className="space-x-2 space-x-reverse">
          <input
            className="py-2 px-4 rounded-lg focus:outline-none focus:ring ring-purple-400"
            placeholder="نام دسته"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button
            onClick={addGroupHandler}
            className="bg-purple-400 hover:text-white hover:bg-purple-500 transition py-2 px-4 border-0 rounded-xl"
          >
            افزودن دسته بندی
          </button>
        </div>
        <div className="groups flex flex-col h-64 rounded-lg divide-y-2 overflow-scroll w-3/5 bg-gray-200">
          {groups.length && !filtered.length ? (
            <p className="flex justify-center justify-self-center h-full items-center text-red-500">
              دسته مورد نظر یافت نشد
            </p>
          ) : null}
          {!groups.length ? (
            <p className="flex  justify-self-center h-full justify-center items-center text-red-500">
              هیچ دسته ای وجود ندارد
            </p>
          ) : null}
          {filtered.map((group) => {
            return (
              <div
                className="group grid grid-cols-2 py-5 px-2 bg-white hover:bg-purple-200"
                key={group.id}
              >
                <div className="flex justify-center items-center">
                  <p className="">{group.name}</p>
                </div>
                <div className="flex justify-center items-center">
                  <BiTrash
                    onClick={() => deleteGroupHandler(group.id)}
                    className="h-7 w-7 p-1 text-red-600 cursor-pointer border border-red-600 rounded-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassificationPage;
