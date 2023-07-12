import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 40px 40px 65px;
  font-size: 1.2rem;
  font-weight: 700;
  width: auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-bottom: 20px;

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
      > .description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > .subDescription {
          margin-right: 65px;
          text-align: right;
        }
      }
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

// 이미지를 보여주는 컴포넌트 생성
// item은 클릭은 그 상품자체의 정보를 담고있음
// onClick은 showModal과 selectedImage 의 상태를 바꾸어주는 clickModal 핸들러 함수를 전달받음
// handleBookmarkClick는 현재 클릭한 사진의 bookmark 이미지 클릭시 isBookmarked의 값을 바꿔주는 핸들러함수
const ProductItem = ({ item, onClick, handleBookmarkClick }) => {
  return (
    <div className="itemContainer" onClick={onClick}>
      <FaStar
        onClick={(event) => {
          event.stopPropagation(); // .itemContainer의 onClick 핸들러함수의 이벤트 캡쳐링을 방지하고자 썻으나, 없어도 정상작동(리팩토링 전에는 필요했음)
          handleBookmarkClick(item);
        }}
        fill={item.isBookmarked ? "#FFD361" : "white"} // isBookmarked 여부에 따라 별 색상 변경
      />
      <img src={item.image_url} alt={item.title} />
      <div className="description">
        <div>{item.title}</div>
        <div className="subDescription">
          {item.discountPercentage !== null ? (
            <div>{`${item.discountPercentage}%`}</div>
          ) : item.follower ? (
            <div>
              관심 고객수 <br />
              {Number(item.follower).toLocaleString()}명
            </div>
          ) : null}
          {item.price !== null ? (
            <div>{`${Number(item.price).toLocaleString()}원`}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Main = ({
  productData,
  setProductData,
  isBookmarked,
  setIsBookmarked,
}) => {
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

  // product 사진을 받아오는 api, axios 사용 / 비동기처리x  => 상태끌어올리기 app.js로
  // useEffect(() => {
  //   axios
  //     .get("http://cozshopping.codestates-seb.link/api/v1/products", {
  //       params: { count: 4 },
  //     })
  //     .then((response) => {
  //       const data = response.data.map((item) => ({
  //         ...item,
  //         isBookmarked: false, // 북마크 상태 정보를 추가로 저장
  //       }));
  //       setProductData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //     });
  // }, []);

  // 현재 클릭한 사진의 bookmark 이미지 클릭시 isBookmarked의 값을 바꿔주는 핸들러함수
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
      <Container>
        <ItemWrapper>
          <div className="title">상품 리스트</div>
          <div>
            {productData.map((item, idx) => (
              <ProductItem
                key={idx}
                item={item}
                onClick={() => clickModal(item)}
                handleBookmarkClick={handleBookmarkClick}
              />
            ))}
          </div>
        </ItemWrapper>

        {/* 모달창 랜더링 부분 */}
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

        {/*북마스 리스트 랜더링구간 */}
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
