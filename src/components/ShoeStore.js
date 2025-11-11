import React, { useState } from "react";

// Import local images
import nikeImg from "../images/nike.jfif";
import adidasImg from "../images/adidas.jfif";
import pumaImg from "../images/puma.jfif";

const ShoeStore = () => {
  const [cart, setCart] = useState([]);

  const shoes = [
    { id: 1, name: "Nike Air Zoom", price: 120, image: nikeImg },
    { id: 2, name: "Adidas Ultraboost", price: 150, image: adidasImg },
    { id: 3, name: "Puma Future Rider", price: 95, image: pumaImg },
  ];

  const addToCart = (shoe) => {
    const existingItem = cart.find((item) => item.id === shoe.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }
  };

  const removeFromCart = (shoeId) => {
    setCart(
      cart
        .map((item) =>
          item.id === shoeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container-fluid text-light py-4">
      <h1 className="text-center mb-4 color:black">👟 Shoe Store</h1>

      <div className="row">
        {/* Shoe List */}
        <div className="col-md-8">
          <div className="row">
            {shoes.map((shoe) => (
              <div key={shoe.id} className="col-md-4 mb-4">
                <div className="card bg-dark text-light border-light h-100">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body text-center">
                    <h5>{shoe.name}</h5>
                    <p>${shoe.price}</p>
                    <button
                      className="btn btn-outline-light"
                      onClick={() => addToCart(shoe)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="col-md-4">
          <div className="card bg-dark text-light border-light">
            <div className="card-header">🛒 Shopping Cart</div>
            <ul className="list-group list-group-flush bg-dark text-light">
              {cart.length === 0 ? (
                <li className="list-group-item bg-dark text-muted">
                  Cart is empty
                </li>
              ) : (
                cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {item.name} x {item.quantity}
                    </div>
                    <div>
                      ${item.price * item.quantity}
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="card-footer text-end">
              <h5>Total: ${total}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoeStore;
