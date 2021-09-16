import "./App.css";
import { Switch, Route } from "react-router-dom";
import Routes from "./Routes";
import Layout from "./Layout/Layout";
import { ToastProvider } from "react-toast-notifications";
function App() {
  return (
    <div className="App flex flex-col items-center w-full bg-green-100 h-full">
      <ToastProvider>
        <Layout>
          <Switch>
            {Routes.map((route, index) => {
              return <Route {...route} key={index} />;
            })}
          </Switch>
        </Layout>
      </ToastProvider>
    </div>
  );
}

export default App;
