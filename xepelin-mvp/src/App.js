import "./App.css";
import PrincipalImg from "./assets/xepelin y PayPal.jpeg";

import LoginPage from "./pages/loginPage/loginPage";
import GsheetPage from "./pages/gsheetPage/gsheetPage";
import {useState} from "react";

import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@material-ui/core/IconButton";
function App() {
    const [isLogin, setLogin] = useState(true);
  return (
    <div className="App">
      <div className="banner">
        <img src={PrincipalImg} alt="" className="principal-img" />
          {!isLogin && <IconButton
              aria-label="done"
              onClick={() => setLogin(true)}
          >
              <LogoutIcon/>
          </IconButton>}
      </div>
        {isLogin && <LoginPage setLogin={setLogin}/>}
        {!isLogin && <GsheetPage/>}


    </div>
  );
}

export default App;
