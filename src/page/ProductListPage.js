import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import styled from "styled-components";
import all from "../img/all.png";
import product from "../img/product.png";
import category from "../img/category.png";
import exhibition from "../img/exhibition.png";
import brand from "../img/brand.png";

const FilteringSection = styled.section`
  padding-top: 30px;
  > .FilteringContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    > div {
      margin: 0px 35px;
      // 필터링 섹션 안에 사진
      > img {
        width: 105px;
      }
      // 필터링 섹션 안에 텍스트
      > div {
        text-align: center;
        font-size: 1.3rem;
        margin-top: 8px;
        font-weight: 500;
      }
    }
  }
`;

const ProductListPage = ({ productData, setProductData, isBookmarked }) => {
  // 편하게 map을 통해 랜더링하기 위해 filteringObj를 원하는 형식으로 만들어줌
  const filteringObj = [
    { image: all, label: "전체" },
    { image: product, label: "상품" },
    { image: category, label: "카테고리" },
    { image: exhibition, label: "기획전" },
    { image: brand, label: "브랜드" },
  ];

  return (
    <>
      <Header />
      <FilteringSection>
        <div className="FilteringContainer">
          {filteringObj.map((item, idx) => (
            <div key={idx}>
              <img src={item.image} alt={item.label} />
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </FilteringSection>
      ;
      <div>
        {productData.slice(0, 20).map((el, idx) => {
          return <img key={idx} src={el.image_url} alt={el.title} />;
        })}
      </div>
      <Footer />
    </>
  );
};
export default ProductListPage;
