import React from "react";
import { FaStar } from "react-icons/fa";

// 이미지를 보여주는 컴포넌트 생성
// item은 클릭은 그 상품자체의 정보를 담고있음
// onClick은 showModal과 selectedImage 의 상태를 바꾸어주는 clickModal 핸들러 함수를 전달받음
// handleBookmarkClick는 현재 클릭한 사진의 bookmark 이미지 클릭시 isBookmarked의 값을 바꿔주는 핸들러함수
const ProductItem = ({ item, onClick, handleBookmarkClick, isDiscount }) => {
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
      <div className="descriptionContainer">
        <div className="subDescriptionContainer">
          <div className="descriptionItem">
            {item.type === "Product"
              ? item.title
              : item.type === "Category"
              ? `# ${item.title}`
              : item.type === "Exhibition"
              ? item.title
              : item.type === "Brand"
              ? item.brand_name
              : ""}
          </div>
          <div className="descriptionItem2">
            {item.type === "Exhibition" ? item.sub_title : ""}
          </div>
        </div>
        <div className="subDescriptionContainer2">
          <div className={`descriptionItem3${isDiscount}`}>
            {item.type === "Product"
              ? `${item.discountPercentage}%`
              : item.type === "Brand"
              ? "관심고객수"
              : ""}
          </div>
          <div className="descriptionItem4">
            {item.type === "Product"
              ? `${Number(item.price).toLocaleString()}원`
              : item.type === "Brand"
              ? item.follower
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
