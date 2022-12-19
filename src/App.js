import './App.css';
import {ObserverHome} from "./components/pages/Home";
import {ObserverContact} from "./components/pages/Contact";
import {ObserverHoraire} from "./components/pages/Horaire"
import {ObserverPrivateRoute} from "./utils/PrivateRoute";
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from "./components/pages/Chat";
import {ObserverAdminRoute} from "./utils/AdminRoute";
import {ObserverAdminPanel} from "./components/pages/AdminPanel";
import {ObserverSynthese} from "./components/pages/Synthese";
import SignalRHub from "./utils/SignalRHub";
import {ObserverDemande} from "./components/pages/Demande";

function App() {

    SignalRHub()

  return (
      <Router>
          <Routes>
              <Route path="/" exact element={<ObserverHome/>}/>
              <Route path="/contact" element={<ObserverContact/>}/>
              <Route element={<ObserverPrivateRoute/>}>
                  <Route path="/horaire" element={<ObserverHoraire/>}/>
                  <Route path="/chat" element={<Chat/>}/>
                  <Route path="/synthese" element={<ObserverSynthese/>}/>
                  <Route path="/demande" element={<ObserverDemande/>}/>
                  <Route path="/adminPanel" element={<ObserverAdminRoute/>}>
                      <Route path="/adminPanel" element={<ObserverAdminPanel/>}/>
                  </Route>
              </Route>



          </Routes>
      </Router>
  );
}

export default App;
