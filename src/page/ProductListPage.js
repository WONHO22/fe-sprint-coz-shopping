import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";

const ProductListPage = ({ setProductData }, { isBookmarked }) => {
  // product 사진을 받아오는 api, axios 사용 / 비동기처리x
  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        params: { count: 4 },
      })
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          isBookmarked: false, // 북마크 상태 정보를 추가로 저장
        }));
        setProductData(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);
  return (
    <>
      <Header />
      <div>상품리스트 페이지 입니다.</div>;
      <Footer />
    </>
  );
};
export default ProductListPage;
