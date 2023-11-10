import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import EditorPage from "./pages/editor.page";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/editor" element={<EditorPage/>}/>
        <Route path={`/`} element={<Navbar />}>
          <Route path={`signin`} element={<UserAuthForm type="sign-in"/>} />
          <Route path={`signup`} element={<UserAuthForm type="sign-up"/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
