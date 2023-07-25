import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductItem from "../component/ProductItem";
import ProductModal from "../component/ProductModal";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 40px 0px 65px;
  font-size: 1.2rem;
  font-weight: 700;
  width: auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-bottom: 10px;

  .title {
    font-size: 2rem;
  }

  > div {
    display: flex;
    flex-direction: row;
    width: 25%;

    .itemContainer {
      margin-top: -40px;

      // product bookmark
      > svg {
        display: relative;
        transform: translate(330px, 275px);
        width: 35px;
        height: 35px;
        color: white;
        cursor: pointer;
      }

      > img {
        width: 385px;
        height: 280px;
        border-radius: 15px;
        margin: 10px 65px 0px 0px;
      }
      > .descriptionContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > .subDescriptionContainer {
          > .descriptionItem2 {
            font-weight: 500;
          }
        }

        > .subDescriptionContainer2 {
          margin-right: 65px;
          text-align: right;
          // 할인율 나오는 부분
          > .descriptionItem3true {
            color: #452cdd;
          }
        }
      }
    }
  }
`;

const Main = ({ productData, setProductData }) => {
  // product 사진을 받아오는 상태
  // const [productData, setProductData] = useState([]); // app.js로 상태끌어올리기
  // 모달창 구현을 위한 상태
  const [showModal, setShowModal] = useState(false);
  // 클릭한 이미지의 상태 저장
  const [selectedImage, setSelectedImage] = useState(null);
  // 북마크 클릭시 상태를 저장
  // const [isBookmarked, setIsBookmarked] = useState(false); // app.js로 상태끌어올리기

  // product 클릭시 실행되는 핸들러 함수
  // 클릭한 이미지의 데이터를 selectedImage에 저장
  const clickModal = (item) => {
    setShowModal(!showModal);
    setSelectedImage(item);
  };

  // 현재 클릭한 사진의 bookmark 이미지 클릭시 isBookmarked의 값을 바꿔주는 핸들러함수
  const handleBookmarkClick = (item) => {
    const newData = productData.map((data) => {
      if (data.id === item.id) {
        const isBookmarked = !item.isBookmarked;
        // toast 띄워주기
        toast(
          isBookmarked
            ? "⭐ 상품이 북마크에 추가되었습니다."
            : "☆ 상품이 북마크에서 제거되었습니다."
        );
        return {
          ...data,
          isBookmarked, // == isBookmarked: !data.isBookmarked 해당 상품 항목의 isBookmarked값 업데이트
        };
      }
      return data;
    });
    setProductData(newData); // 북마크 여부를 isBookmarked에 불린값으로 ProductData에 저장해둠 (isBookmarked 기본값 false)
  };

  return (
    <>
      <Header />
      <Container>
        <ItemWrapper>
          <div className="title">상품 리스트</div>
          <div>
            {productData.slice(0, 4).map((item, idx) => (
              <ProductItem
                key={idx}
                item={item}
                onClick={() => clickModal(item)}
                handleBookmarkClick={handleBookmarkClick}
                setSelectedImage={setSelectedImage}
                isDiscount={item.type === "Product"}
              />
            ))}
          </div>
        </ItemWrapper>

        {/* 모달창 랜더링 부분 */}
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedImage={selectedImage}
          handleBookmarkClick={handleBookmarkClick}
          setSelectedImage={setSelectedImage}
        />

        {/*북마크 리스트 랜더링구간 */}
        <ItemWrapper>
          <div className="title">북마크 리스트</div>
          <div>
            {productData
              .filter((item) => item.isBookmarked)
              .map((item, idx) => (
                <ProductItem
                  key={idx}
                  item={item}
                  onClick={() => clickModal(item)}
                  handleBookmarkClick={handleBookmarkClick}
                  setSelectedImage={setSelectedImage}
                  isDiscount={item.type === "Product"}
                />
              ))}
          </div>
        </ItemWrapper>
      </Container>
      <Footer />
    </>
  );
};
export default Main;
