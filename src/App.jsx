import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import EditorPage from "./pages/editor.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import HomePage from "./components/homepage.component";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null}) 
  }, [])
  



  return (
    <div>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/editor" element={<EditorPage />} />
          <Route path={`/`} element={<Navbar />}>
            <Route index element={<HomePage/>}/>
            <Route path={`signin`} element={<UserAuthForm type="sign-in" />} />
            <Route path={`signup`} element={<UserAuthForm type="sign-up" />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
