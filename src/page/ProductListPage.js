import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import styled from "styled-components";
import all from "../img/all.png";
import product from "../img/product.png";
import category from "../img/category.png";
import exhibition from "../img/exhibition.png";
import brand from "../img/brand.png";
import ProductItem from "../component/ProductItem";
import ProductModal from "../component/ProductModal";

const FilteringSection = styled.section`
  padding-top: 30px;
  > .FilteringContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    > div {
      margin: 0px 30px;
      cursor: pointer;
      // 필터링 섹션 안에 사진
      > img {
        width: 105px;
      }
      // 필터링 섹션 안에 텍스트
      > .FilteringLabel {
        text-align: center;
        font-size: 1.3rem;
        margin-top: 8px;
        font-weight: 500;
      }
    }
  }
`;

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

const ProductListPage = ({ productData, setProductData, isBookmarked }) => {
  // 편하게 map을 통해 랜더링하기 위해 filteringObj를 원하는 형식으로 만들어줌
  const filteringObj = [
    { image: all, label: "전체", type: "" },
    { image: product, label: "상품", type: "Product" },
    { image: category, label: "카테고리", type: "Category" },
    { image: exhibition, label: "기획전", type: "Exhibition" },
    { image: brand, label: "브랜드", type: "Brand" },
  ];

  const [showModal, setShowModal] = useState(false);
  // 클릭한 이미지의 상태 저장
  const [selectedImage, setSelectedImage] = useState(null);
  // 초기 랜더링될 이미지의 수를 8로 설정
  const [renderedItems, setRenderedItems] = useState(12);
  // 상품 필터링을 해주기 위한 상태
  const [selectedFilter, setSelectedFilter] = useState("전체");

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
        return {
          ...data,
          isBookmarked: !data.isBookmarked, // 해당 상품 항목의 isBookmarked값 업데이트
        };
      }
      return data;
    });
    setProductData(newData); // 북마크 여부를 isBookmarked에 불린값으로 ProductData에 저장해둠 (isBookmarked 기본값 false)
  };

  useEffect(() => {
    // 스크롤 이벤트에 handleScroll핸들러 함수 등록
    window.addEventListener("scroll", handleScroll);
    // 메모리 누수 방지를 위해 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤 이벤트에 등록할 핸들러 함수
  const handleScroll = () => {
    // 사용자가 bottom까지 스크롤했는이 여부를 판단
    // 뷰포트의 보이는 높이(window.innerHeight)와 문서의 수직 스크롤 위치(window.scrollY)의 합이 문서의 전체 높이(document)보다 크거나 같은지 확인
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom) {
      // bottom까지 스크롤 한 경우 초기값(이전값) + 12을 해준값으로 renderedItems상태 변경
      // slice 메서드를 통해 +12씩 늘려줄거임
      setRenderedItems((prevCount) => prevCount + 12);
    }
  };

  // 상품 목록 필터링을 위한 함수
  // 필터링 항목 클릭시 해당 item의 type selectedFilter에 저장 ex)Product, Exhibition, Brand
  const filteringProduct = (type) => {
    setSelectedFilter(type);
  };

  return (
    <>
      <Header />
      <FilteringSection>
        <div className="FilteringContainer">
          {filteringObj.map((item, idx) => (
            <div key={idx} onClick={() => filteringProduct(item.type)}>
              <img src={item.image} alt={item.label} />
              <div className="FilteringLabel">{item.label}</div>
            </div>
          ))}
        </div>
      </FilteringSection>

      {/*상품리스트 랜더링 부분 */}
      <ProductContainer>
        {productData
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

      {/* 모달창 랜더링 부분 */}
      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedImage={selectedImage}
        handleBookmarkClick={handleBookmarkClick}
        setSelectedImage={setSelectedImage}
      />

      <Footer />
    </>
  );
};
export default ProductListPage;
