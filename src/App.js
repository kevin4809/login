import { HashRouter, Route, Routes } from "react-router-dom";

//pages
import Login from "./Pages/login";
import CreateAccount from "./Pages/createAccount";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
