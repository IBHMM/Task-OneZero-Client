import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/productmodal.scss';

function ProductModal({ product, onClose }) {
  const modalRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); 

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setShow(false); 
    };
  }, [onClose]);

  const handleIncrease = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  const totalPrice = (product.priceSell * quantity).toFixed(2);

  return (
    <div className={`product-modal ${show ? 'open' : ''}`}>
      <div className="modal-overlay" />
      <div className={`modal-content ${show ? 'open' : ''}`} ref={modalRef}>
        <img src={product.coverImageSrc} alt="" />
        <div className="information">
          <h2>{product.name[0].value}</h2>
          <p>Category: {product.category}</p>
          <p>Price per item: {product.priceSell}₼</p>

          <div className="quantity-controls">
            <button onClick={handleDecrease} className="quantity-btn">-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease} className="quantity-btn">+</button>
          </div>

          <p>Total Price: {totalPrice}₼</p>
          <div className="additional-info">
            <hr />
            <ul>
              <li>Size: Large</li>
              <li>Nuts: Hazelnut, 2 x Almond, Macadamia</li>
              <li>Syrups: Vanilla, Honey</li>
              <li>Fruits: Banana, 2 x Raspberry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
