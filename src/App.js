import './App.css';
import {ObserverHome} from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import {ObserverHoraire} from "./components/pages/Horaire"
import {Routes, Route} from "react-router-dom";
import Chat from "./components/pages/Chat";
function App() {
  return (
      <Routes>
          <Route path="/" element={<ObserverHome/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/horaire" element={<ObserverHoraire/>}/>
          <Route path="/chat" element={<Chat/>}/>
      </Routes>
  );
}

export default App;
