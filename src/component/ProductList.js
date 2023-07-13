import React from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 97%;
  margin: 40px 10px 10px 10px;
  > .itemContainer {
    // 상품리스트 사진
    margin-bottom: 15px;
    > img {
      width: 410px;
      height: 300px;
      border-radius: 15px;
    }
    // 북마크 이미지
    > svg {
      display: relative;
      transform: translate(400px, -10px);
      width: 35px;
      height: 35px;
      color: white;
      cursor: pointer;
    }
    > .descriptionContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 1.2rem;
      font-weight: 700;
      > .subDescriptionContainer {
        margin-left: 35px;
        > .descriptionItem2 {
          font-weight: 500;
        }
      }
      > .subDescriptionContainer2 {
        text-align: right;
        // 할인율 나오는 부분
        > .descriptionItem3true {
          color: #452cdd;
        }
        > .descriptionItem4 {
          font-weight: 400;
        }
      }
    }
  }
`;

const ProductList = ({
  productData,
  clickModal,
  handleBookmarkClick,
  selectedFilter,
  renderedItems,
  bookmarkedFilter, // 북마크 필터할건지 안할건지 여부를 true /false로 받는다
}) => {
  //북마크 필터링 기능을 추가할것인가, 추가하지 않을것인가를 결정하는 로직

  let filteredData = productData;
  // bookmarkedFilter를 true로 props로 넘긴경우 (북마크 페이지의 경우) 데이터를 북마크된것만 필터링
  // false로 받는경우 if문이 동작을 안해서 그냥 productData 전체를 랜더링해주게 됨
  if (bookmarkedFilter) {
    filteredData = filteredData.filter((item) => item.isBookmarked === true);
  }
  return (
    <ProductContainer>
      {filteredData
        // 북마크 된것만 표시
        // .filter((item) => item.isBookmarked === true)
        .filter((item) => {
          // selectedFilter가 ""(전체) 일경우 모두다 랜더링
          if (selectedFilter === "") {
            return true;
          }
          // 전체가 아닌경우 해당 필터에 맞는 목록 랜더링
          return item.type === selectedFilter;
        })
        .slice(0, renderedItems)
        .map((item, idx) => (
          <ProductItem
            key={idx}
            item={item}
            onClick={() => clickModal(item)}
            handleBookmarkClick={handleBookmarkClick}
            isDiscount={item.type === "Product"}
            selectedFilter={selectedFilter}
          />
        ))}
    </ProductContainer>
  );
};

export default ProductList;
