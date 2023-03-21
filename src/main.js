import { Route, Routes } from "react-router";
import Visualize from "./pages/Visualize";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Visualize />} />
    </Routes>
  );
}
