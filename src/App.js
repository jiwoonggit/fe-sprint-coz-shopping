import { Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer"
import Main from "../src/pages/Main";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);
  const [buttonType, setButtonType] = useState('All')
  const filteredProducts = products.filter((product)=> product.type === buttonType)
  const [isOnToast, setIsOnToast] = useState(null);
  const [starList, setStarList] = useState((new Array(filteredProducts.length).fill(false)));
  

  useEffect(() => {
    axios
      .get('http://cozshopping.codestates-seb.link/api/v1/products')
      .then(response => {
        console.log(response.data); // 받은 데이터 확인
        setProducts(response.data); // 받은 데이터로 products 상태 업데이트
      })
      .catch(error => {
        console.log("에러:", error);
      });
  }, []);

  const handleIconClick = (event, productId) =>{
    event.stopPropagation();
    const clickedIndex = filteredProducts.findIndex((product)=>product.id === productId)
    if(clickedIndex !== -1){
    const updatedList = [...starList]
    updatedList[clickedIndex] = !updatedList[clickedIndex]
    setStarList(updatedList)
    setIsOnToast(updatedList[clickedIndex]);
    };}

    const handleIconClickAllType = (event, productId) =>{
      event.stopPropagation();
      const clickedIndex = products.findIndex((product)=>product.id === productId)
      if(clickedIndex !== -1){
      const updatedList = [...starList]
      updatedList[clickedIndex] = !updatedList[clickedIndex]
      setStarList(updatedList)
      setIsOnToast(updatedList[clickedIndex]);
      }
      };

    useEffect(()=>{
      setStarList(new Array(filteredProducts.length).fill(false));
       }, [filteredProducts.length]);


  return (
      <>
      <Header />
      <Routes>
        <Route path="/products/list" 
        element={<Productslist 
        products={products} 
        isOnToast={isOnToast} 
        setIsOnToast={setIsOnToast} 
        buttonType={buttonType} 
        setButtonType={setButtonType} 
        filteredProducts={filteredProducts}
        handleIconClick={ handleIconClick}
        handleIconClickAllType={handleIconClickAllType}
        starList={starList} setStarList={setStarList}/>} />
      </Routes>
      <Footer />
      </>
      
     
  );
}

export default App;