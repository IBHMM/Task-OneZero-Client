import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductModal from "./ProductModal";
import "../styles/components/productlist.scss";

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categories, status, selectedCategory } = useSelector(
    (state) => state.menu
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const productsToShow =
    selectedCategory !== "all" &&
    categories
      .filter((category) => category.name[0]?.value === selectedCategory)
  
  return (
    <div className="product-list">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading products</p>}
      {status === "succeeded" && (
        <>
          {selectedCategory === "all"
            ? categories.map((list) => (
                <>
                  <p className="header">{list.name[0].value}</p>
                  <div className="product-line">
                    {list.menuItems.map((item) => (
                      <div
                        className="product-card"
                        key={item.id}
                        onClick={() => handleProductClick(item)}
                      >
                        <img src={item.coverImageSrc} alt="" />  
                        <div className="price">
                          {`₼ ${item.priceSell}`}
                        </div>
                        <p>{item.name[0].value}</p>
                      </div>
                    ))}
                  </div>
                </>
              ))
            : productsToShow?.map((item) => (
                  <>
                    <p className="header">{item.name[0].value}</p>
                    <div className="product-line" key={item.name[0].value}>
                      {
                        item.menuItems.map((product, idx) => {
                          return (
                            <div className="product-card" onClick={() => handleProductClick(product)} key={idx}>
                              <img src={product.coverImageSrc} alt="" />  
                              <div className="price">
                                {`₼ ${product.priceSell}`}
                              </div>
                              <p>{product.name[0].value}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  </>
              ))}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
