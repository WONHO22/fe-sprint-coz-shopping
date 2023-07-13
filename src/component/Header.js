import React, { useEffect, useState, useRef } from "react";
import logo from "../img/logo.png";
import nevMenu from "../img/햄버거 버튼.png";
import styled from "styled-components";
import { MdStarOutline, MdOutlineCardGiftcard } from "react-icons/md";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 80px;
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1));
  > a > .logo {
    width: 55px;
    height: 30px;
    margin: 20px;
  }
  > .nevMenu {
    width: 34px;
    height: 24px;
    margin-left: auto;
    margin-right: 100px;
    cursor: pointer;
  }
  > div {
    font-size: 2rem;
    font-weight: 700;
    width: 300px;
  }
`;

const DropdownContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 80%;
  right: 3%;
  border-radius: 15px;
  padding: 10px 20px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1));
  font-size: 1.2rem;
  line-height: 2.5rem;
  > .line {
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.4);
  }
  // Link 흔적 지우기 위한 CSS
  a {
    text-decoration: none;
    color: black;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  a:focus {
    text-decoration: none;
  }
  a:hover,
  a:active {
    text-decoration: none;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outsideRef = useRef();

  useEffect(() => {
    const outsideClick = (e) => {
      if (isOpen && !outsideRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [isOpen]);

  const clickMenuIcon = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <Link to="/">
        <img className="logo" src={logo} alt="로고" o />
      </Link>
      <div>COZ Shopping</div>
      <img
        className="nevMenu"
        src={nevMenu}
        alt="햄버거버튼"
        onClick={clickMenuIcon}
      />

      {isOpen && (
        <DropdownContainer ref={outsideRef}>
          <div className="dropDown-list">ooo님, 안녕하세요!</div>
          <div className="line"></div>
          <Link className="dropDown-list" to="/productlist">
            <div className="line">
              <MdOutlineCardGiftcard className="dropDown-Icon" />
              상품리스트 페이지
            </div>
          </Link>
          <div className="line"></div>
          <Link className="dropDown-list" to="/bookmark">
            <div>
              <MdStarOutline className="dropDownIcon" />
              북마크 페이지
            </div>
          </Link>
        </DropdownContainer>
      )}
    </Container>
  );
};
export default Header;
