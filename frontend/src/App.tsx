import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import SubmisionPage from "./pages/SubmisionPage";
import "@fontsource/inter/400.css"; 
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path="/" element={<ProductPage/>} />
        <Route path="/submit" element={<SubmisionPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
