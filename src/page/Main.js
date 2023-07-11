import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";

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
      justify-content: center;

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

const Main = () => {
  // product 사진을 받아오는 상태
  const [productData, setProductData] = useState([]);

  // product 사진을 받아오는 api, axios 사용 / 비동기처리x
  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        params: { count: 4 },
      })
      .then((response) => setProductData(response.data))
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
              <div className="itemContainer" key={idx}>
                <img src={item.image_url} alt={item.title} />
                <div className="description">
                  <div>{item.title}</div>{" "}
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
