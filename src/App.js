import { Routes, Route } from "react-router-dom";
import Home from './Home';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
