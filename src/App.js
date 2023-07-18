import "./App.scss";
import { Route, Routes } from "react-router";
import Visualize from "./pages/Visualize";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MenuOverlay from "./components/MenuOverlay/HamburgerMenu";

function App() {
  return (
    <div className="App">
      <Header />
      <MenuOverlay/>
      <Routes>
        <Route path="/" element={<Visualize />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
