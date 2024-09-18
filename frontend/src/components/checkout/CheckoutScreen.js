import React, { useState } from "react";

const Checkout = () => {
  const [products, setProducts] = useState([
    { name: "Product A", price: 100, quantity: 1, image: "https://example.com/images/productA.jpg" },
    { name: "Product B", price: 200, quantity: 1, image: "https://example.com/images/productB.jpg" },
    { name: "Product C", price: 150, quantity: 1, image: "https://example.com/images/productC.jpg" },
  ]);

  // Handle quantity change
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value;
    setProducts(updatedProducts);
  };

  // Handle checkout button click
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }), // Send the products array to the backend
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout page
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>
              Quantity:{" "}
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                min="1"
              />
            </p>
            <img src={product.image} alt={product.name} style={{ width: "100px", height: "100px" }} />
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
