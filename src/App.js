import AppRouter from "./SharedComponent/appRouter";
import CustomSnackBarComponent from './SharedComponent/CustomSnackBarComponent'
import {useSelector} from 'react-redux'
import "./App.css";

function App() {
  const isSnackBarOpen = useSelector((state) => state.commonReducer.isSnackBarOpen);
  const message = useSelector((state) => state.commonReducer.message);

  return (
    <div className="App">
      <AppRouter />
      { isSnackBarOpen  && <CustomSnackBarComponent isOpen={isSnackBarOpen} message={message} />  }
    </div>
  );
}

export default App;
