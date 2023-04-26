import React, { useState, useEffect } from "react";

import Button from "./Button";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const pprice = event.target.pprice.value;
    const pname = event.target.pname.value;
    const category = document.getElementById("select").value;

    const newProduct = {
      pprice,
      pname,
      category,
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Reset form fields
    event.target.reset();
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="pprice">Product Price: </label>
          <input type="number" id="pprice" required />
          <label htmlFor="pname">Product Name: </label>
          <input type="text" id="pname" required />
          <label htmlFor="category">Category: </label>
          <select name="category" id="select">
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
          </select>
          <Button>Add Product</Button>
        </div>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>
              <p>Product Name: {product.pname}</p>
              <p>Product Price: {product.pprice}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
