import './App.scss';
import { Route, Routes } from 'react-router';
import Visualize from './pages/Visualize';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Header />
      <Routes>
        <Route path="/" element={<Visualize />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
