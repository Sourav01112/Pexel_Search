import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MainRoute } from "./Routes/MainRoute";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SetLoading } from "./redux/loaderSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loaderReducer);
  // console.log(isLoading);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        dispatch(SetLoading(false));
      }, 2000); // 2 minutes in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <MainRoute />
    </div>
  );
}

export default App;
