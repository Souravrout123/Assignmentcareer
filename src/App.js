/** @format */

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listproduct from "./Component/Listproduct/listproduct";
import Addproduct from "./Component/AddProduct/addproduct";
import EditProduct from "./Component/EditProduct/editproduct";
import Productdetails from "./Component/Viewproductdetails/productdetails";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listproduct />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/viewdetails" element={<Productdetails />} />
        </Routes>
        <ToastContainer />

      </BrowserRouter>

    </>
  );
}

export default App;
