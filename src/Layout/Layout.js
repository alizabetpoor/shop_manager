import Header from "../Components/Header/Header";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-container w-3/5 my-4">{children}</div>
    </>
  );
};

export default Layout;
