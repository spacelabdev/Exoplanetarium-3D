import "./App.scss";
import { Route, Routes } from "react-router";
import Visualize from "./pages/Visualize";

export default function Main() {
  return (
    <div>
      <Routes>
        <Route index element={<Visualize />} />
      </Routes>
    </div>
  );
}
