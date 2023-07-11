import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  color: #888888;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
`;

const Footer = () => {
  return (
    <>
      <Container>
        <div>개인정보 처리방침 | 이용 약관</div>
        <div>All rights reserved @ Codestates</div>
      </Container>
    </>
  );
};
export default Footer;
