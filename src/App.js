import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import BookmarkPage from "./page/BookmarkPage";
import ProductListPage from "./page/ProductListPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [productData, setProductData] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          isBookmarked: false, // 북마크 상태 정보를 추가로 저장
        }));
        setProductData(data); // 받을때 모든 데이터를 받고 Main에는 4개만 전달, ProductListPage에는 전체 전달
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                productData={productData}
                setProductData={setProductData}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
            }
          ></Route>
          <Route
            path="/productlist"
            element={
              <ProductListPage
                productData={productData}
                setProductData={setProductData}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
            }
          ></Route>
          <Route
            path="/bookmark"
            element={
              <BookmarkPage
                productData={productData}
                setProductData={setProductData}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  );
}

export default App;
