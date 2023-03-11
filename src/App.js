import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Visualize from "./routes/visualize/visualize.component";
import About from "./routes/about/about.component";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="visualize" element={<Visualize />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default App;
