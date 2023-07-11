import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";
import { AiFillStar, IoClose } from "react-icons/io5";
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
    width: 100%;

    .itemContainer {
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

const Main = () => {
  // product 사진을 받아오는 상태
  const [productData, setProductData] = useState([]);
  // 모달창 구현을 위한 상태
  const [showModal, setShowModal] = useState(false);
  // 클릭한 이미지의 상태 저장
  const [selectedImage, setSelectedImage] = useState(null);
  // 북마크 클릭시 상태를 저장
  const [isBookmarked, setIsBookmarked] = useState(false);

  // product 클릭시 실행되는 핸들러 함수
  // 클릭한 이미지의 데이터를 selectedImage에 저장
  const clickModal = (item) => {
    setShowModal(!showModal);
    setSelectedImage(item);
  };

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
      <Container>
        <ItemWrapper>
          <div className="title">상품 리스트</div>
          <div>
            {productData.map((item, idx) => (
              <div
                className="itemContainer"
                key={idx}
                onClick={() => clickModal(item)}
              >
                <FaStar
                  onClick={(event) => {
                    event.stopPropagation();
                    const newData = productData.map((data) => {
                      if (data.id === item.id) {
                        return {
                          ...data,
                          isBookmarked: !data.isBookmarked, // 해당 상품 항목만 업데이트
                        };
                      }
                      return data;
                    });
                    setProductData(newData);
                  }}
                  fill={item.isBookmarked ? "#FFD361" : "white"} // 해당 상품 항목의 북마크 상태에 따라 색상 설정
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
            ))}
          </div>
        </ItemWrapper>
        {/* 모달창 랜더링 부분 */}
        {showModal && (
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
                {/* 북마크 */}
                <FaStar
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsBookmarked(!isBookmarked);
                  }}
                  fill={isBookmarked ? "#FFD361" : "white"}
                />
                <div>{selectedImage.title}</div>
              </div>
            </div>
          </ProductModal>
        )}
        <ItemWrapper>
          <div className="title">북마크 리스트</div>
          <div>
            {productData.map((item, idx) => (
              <div className="itemContainer" key={idx}>
                <img src={item.image_url} alt={item.title} />
                <div>사진설명</div>
              </div>
            ))}
          </div>
        </ItemWrapper>
      </Container>
      <Footer />
    </>
  );
};
export default Main;
