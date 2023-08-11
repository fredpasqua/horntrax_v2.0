import "./App.css";
import InstrumentList from "./instrumentList";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegistrationView } from "./Components/registrationView/registration-view.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<InstrumentList />} />
        <Route path="/horntrax_v2.0" element={<InstrumentList />} />
        <Route path="register" element={<RegistrationView />} />
        <Route path="login" element={<InstrumentList />} />
      </Routes>
    </div>
  );
}

export default App;
