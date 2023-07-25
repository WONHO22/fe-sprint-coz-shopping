import React from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

// 클릭시 모달창 CSS
const ProductModalWrapper = styled.div`
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

const ProductModal = ({
  showModal,
  setShowModal,
  selectedImage,
  handleBookmarkClick,
  setSelectedImage,
}) => {
  /*props로 받은 shoModal false일때는 랜더링X */
  if (!showModal) {
    return null;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleBookmark = () => {
    const updatedImage = {
      ...selectedImage,
      isBookmarked: selectedImage.isBookmarked,
    };
    handleBookmarkClick(updatedImage);
  };

  return (
    <ProductModalWrapper onClick={closeModal}>
      <div
        className="modalContent"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="closeButton">
          <IoClose onClick={closeModal} />
        </div>
        <img src={selectedImage.image_url} alt={selectedImage.title} />
        <div className="bookmarkStar">
          <FaStar
            onClick={(event) => {
              event.stopPropagation();
              toggleBookmark();
              /* 모달창 내부에서 북마크 이미지 클릭시 내부/외부 isbookmarked 상태가 반영되게하는 코드 */
              setSelectedImage((prevImage) => ({
                ...prevImage,
                isBookmarked: !prevImage.isBookmarked,
              }));
            }}
            fill={selectedImage.isBookmarked ? "#FFD361" : "white"}
          />
          <div>{selectedImage.title}</div>
        </div>
      </div>
    </ProductModalWrapper>
  );
};

export default ProductModal;
