import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <Map />
      <Sidebar />
      <div id="frame" />
    </div>
  );
}

export default App;
