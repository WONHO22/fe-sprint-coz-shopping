import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import BookmarkPage from "./page/BookmarkPage";
import ProductListPage from "./page/ProductListPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: 15px;
    padding: 10px;
    font-size: 1.2rem;
    width: 390px;
    right: 100px;
    > button {
      align-self: center;
    }
  }
`;

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => {
        const data = response.data.map((item) => {
          // 데이터의 type가 Brand 인경우 분기처리
          // Brand의 경우 image_url이 없고 brand_image_url이 있기 때문에, image_url값을 brand_image_url로 바꿔줌
          if (!item.image_url) {
            return {
              ...item,
              isBookmarked: false, // 북마크 상태 정보를 추가로 저장(기본값 false)
              image_url: item.brand_image_url,
            };
          }
          return {
            ...item,
            isBookmarked: false, // 북마크 상태 정보를 추가로 저장(기본값 false)
          };
        });

        setProductData(data); // 받을때 모든 데이터를 받고 Main에는 4개만 사용, ProductListPage에는 전체 데이터를 사용
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
              <Main productData={productData} setProductData={setProductData} />
            }
          ></Route>
          <Route
            path="/productlist"
            element={
              <ProductListPage
                productData={productData}
                setProductData={setProductData}
              />
            }
          ></Route>
          <Route
            path="/bookmark"
            element={
              <BookmarkPage
                productData={productData}
                setProductData={setProductData}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <CustomToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
