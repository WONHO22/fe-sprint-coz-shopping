import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";

const ProductListPage = ({ productData, setProductData, isBookmarked }) => {
  return (
    <>
      <Header />
      <div>상품리스트 페이지 입니다.</div>;
      <img src={productData[0].image_url} alt={productData[0].title} />
      <Footer />
    </>
  );
};
export default ProductListPage;
