import React, { useState, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Add = () => {
  const url = "http://localhost:4000";

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", data);
    console.log("Submitted Image:", image);

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
        setPreview(null);
      } else {
        alert("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!image || !(image instanceof File)) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmitHandler}>
        {/* Image Upload */}
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={preview || assets.upload_area} alt="upload-area" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            autoComplete="off"
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter Product Name"
            required
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Enter Product Description"
            required
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Enter Product Price like $20"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
