import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import styled from "styled-components";
import all from "../img/all.png";
import product from "../img/product.png";
import category from "../img/category.png";
import exhibition from "../img/exhibition.png";
import brand from "../img/brand.png";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ProductItem from "../component/ProductItem";

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

const ProductModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    > .closeButton {
      > svg {
        position: absolute;
        top: 15px;
        right: 0;
        width: 70px;
        height: 45px;
        color: white;
        cursor: pointer;
      }
    }

    > .bookmarkStar {
      > svg {
        position: absolute;
        bottom: 30px;
        left: 20px;
        width: 35px;
        height: 35px;
        color: white;
        cursor: pointer;
      }
      > div {
        position: absolute;
        bottom: 30px;
        left: 65px;
        width: 400px;
        height: 35px;
        color: white;
        cursor: pointer;
        font-size: 1.6rem;
      }
    }

    > img {
      width: 1100px;
      height: 680px;

      border-radius: 15px;
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

      {/* 모달창 뜨는 부분 */}
      {showModal && ( // 상품 이미지 클릭시 핸들러함수 clickModal 가 실행되어 showModal의 값이 바뀜 + 클릭한 사진이 SelectedImage 상태에 저장됨
        <ProductModal onClick={() => setShowModal(false)}>
          <div>
            <div className="closeButton">
              <IoClose />
            </div>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              onClick={(event) => event.stopPropagation()}
            />
            <div className="bookmarkStar">
              {/* 모달창 내부 북마크 이미지 */}
              <FaStar
                onClick={(event) => {
                  // 이벤트 캡처링으로 모달창 내부에서 클릭시 onClick={() => setShowModal(false)} 실행 방지
                  event.stopPropagation();
                  const newData = productData.map((data) => {
                    // 모달창 내부 북마크 클릭시 => 클릭된 사진이 메인창에서 내가 클릭한 사진인지 확인
                    // => 맞다면 isBookmarked 값을 바꾸어 줌(색상 및 isBookmarked값 변경)
                    // => 변경된 isBookmarked 값을 productData에 업데이트
                    if (data.id === selectedImage.id) {
                      return {
                        ...data,
                        isBookmarked: !selectedImage.isBookmarked,
                      };
                    }
                    return data;
                  });
                  setProductData(newData);
                  // 모달창 내부 북마크 클릭시 현재 클릭된 사진(selectedImage)의 isBookmarked값을 변경시켜줘야하기 때문에 추가한 로직
                  setSelectedImage((prevImage) => ({
                    ...prevImage,
                    isBookmarked: !prevImage.isBookmarked,
                  }));
                }}
                fill={selectedImage.isBookmarked ? "#FFD361" : "white"}
              />
              {/* 해당 상품 항목의 북마크 상태에 따라 색상 설정 */}
              <div>{selectedImage.title}</div>
            </div>
          </div>
        </ProductModal>
      )}

      <Footer />
    </>
  );
};
export default ProductListPage;
