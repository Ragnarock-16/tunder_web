import './App.css';
import {ObserverHome} from "./components/pages/Home";
import Contact, {ObserverContact} from "./components/pages/Contact";
import {ObserverHoraire} from "./components/pages/Horaire"
import {ObserverPrivateRoute} from "./utils/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from "./components/pages/Chat";
import {ObserverAdminRoute} from "./utils/AdminRoute";
import {ObserverAdminPanel} from "./components/pages/AdminPanel";
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" exact element={<ObserverHome/>}/>
              <Route path="/contact" element={<ObserverContact/>}/>
              <Route element={<ObserverPrivateRoute/>}>
                  <Route path="/horaire" element={<ObserverHoraire/>}/>
                  <Route path="/chat" element={<Chat/>}/>

                  <Route path="/adminPanel" element={<ObserverAdminRoute/>}>
                      <Route path="/adminPanel" element={<ObserverAdminPanel/>}/>
                  </Route>
              </Route>



          </Routes>
      </Router>
  );
}

export default App;
