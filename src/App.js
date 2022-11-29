import './App.css';
import {ObserverHome} from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import {Routes, Route} from "react-router-dom";
function App() {
  return (
      <Routes>
          <Route path="/" element={<ObserverHome/>}/>
          <Route path="/contact" element={<Contact/>}/>
      </Routes>
  );
}

export default App;
