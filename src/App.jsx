import { useEffect } from "react";
import { MainRoute } from "./Routes/MainRoute";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SetLoading } from "./redux/loaderSlice";
import { TopButton } from "./components/TopButton";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loaderReducer);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        dispatch(SetLoading(false));
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <MainRoute />
      <TopButton />
    </div>
  );
}

export default App;
