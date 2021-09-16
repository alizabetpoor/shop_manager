import HomePage from "./Pages/HomePage";
import ClassificationPage from "./Pages/ClassificationPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AddProductsPage from "./Pages/AddProductsPage";
const Routes = [
  { path: "/", component: HomePage, exact: true },
  { path: "/groups", component: ClassificationPage },
  { path: "/addproduct", component: AddProductsPage },
  { path: "", component: NotFoundPage },
];

export default Routes;
