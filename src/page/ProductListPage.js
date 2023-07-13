import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import styled from "styled-components";
import all from "../img/all.png";
import product from "../img/product.png";
import category from "../img/category.png";
import exhibition from "../img/exhibition.png";
import brand from "../img/brand.png";
import ProductItem from "../component/ProductItem";
import ProductModal from "../component/ProductModal";

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

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  > .itemContainer {
    // 상품리스트 사진
    > img {
      width: 300px;
      height: 300px;
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

  const [showModal, setShowModal] = useState(false);
  // 클릭한 이미지의 상태 저장
  const [selectedImage, setSelectedImage] = useState(null);

  const clickModal = (item) => {
    setShowModal(!showModal);
    setSelectedImage(item);
  };

  const handleBookmarkClick = (item) => {
    const newData = productData.map((data) => {
      if (data.id === item.id) {
        return {
          ...data,
          isBookmarked: !data.isBookmarked, // 해당 상품 항목의 isBookmarked값 업데이트
        };
      }
      return data;
    });
    setProductData(newData); // 북마크 여부를 isBookmarked에 불린값으로 ProductData에 저장해둠 (isBookmarked 기본값 false)
  };

  return (
    <>
      <Header />
      {console.log(productData)}
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

      <ProductContainer>
        {productData.map((item, idx) => (
          <ProductItem
            key={idx}
            item={item}
            onClick={() => clickModal(item)}
            handleBookmarkClick={handleBookmarkClick}
          />
        ))}
      </ProductContainer>

      {/* 모달창 랜더링 부분 */}
      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedImage={selectedImage}
        handleBookmarkClick={handleBookmarkClick}
      />

      <Footer />
    </>
  );
};
export default ProductListPage;
