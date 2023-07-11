import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  font-size: 2rem;
  font-weight: 700;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <div>
          상품 리스트
          <ItemWrapper>
            상품 사진
            <div>사진설명</div>
          </ItemWrapper>
        </div>
        <div>
          북마크 리스트
          <ItemWrapper>
            북마크 사진
            <div>사진설명</div>
          </ItemWrapper>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default Main;
