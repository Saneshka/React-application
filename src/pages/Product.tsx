import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import CategoryType from "../types/CategoryType";

function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);

  function passProductId(id: any) {
    console.log("product id:" + id);
    getProductById(id);
  }
  function handleProductId(event: any) {
    setProductId(event.target.value);
  }
  function handleProductName(event: any) {
    setProductName(event.target.value);
  }
  function handleProductPrice(event: any) {
    setProductPrice(event.target.value);
  }
  function handleDescription(event: any) {
    setDescription(event.target.value);
  }
  function handleCategoryId(event: any) {
    setCategoryId(event.target.value);
  }
  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories");
    setCategories(response.data);
  }
  async function saveProduct() {
    await axios.post("http://localhost:8081/products", {
      name: productName,
      price: productPrice,
      description: description,
      categoryId: categoryId,
    });
    getProducts();
  }
  async function updateProduct() {
    console.log("update method");
    await axios.put("http://localhost:8081/products/" + productId, {
      name: productName,
      price: productPrice,
      description: description,
      categoryId: categoryId,
    });
    getProducts();
  }
  async function getProducts() {
    const response = await axios.get("http://localhost:8081/products");
    setProducts(response.data);
  }
  async function getProductById(id: number) {
    const response = await axios.get("http://localhost:8081/products/" + id);
    const productData = response.data;
    setProductId(productData.id);
    setProductName(productData.name);
    setDescription(productData.description);
    setProductPrice(productData.price);
    setCategoryId(productData.category.id);
  }
  useEffect(function () {
    getProducts();
    loadCategories();
    console.log("default pro Id : ", productId);
  }, []);
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-semibold mb-5 text-slate-800">Products</h1>

      <div className="mx-10">
        <table className="table-auto w-full pb-2">
          <thead>
            <tr className="bg-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-2 w-[50px] text-left">#</th>
              <th className="p-2 w-[200px] text-left">Product Name</th>
              <th className="p-2 w-[200px] text-left">Product Desciption</th>
              <th className="p-2 w-[200px] text-left">Category </th>
              <th className="p-2 w-[100px] text-left">Product Price</th>
              <th className="p-2 w-[100px] text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(function (product) {
              return (
                <tr className="text-slate-600">
                  <td className="p-2 border-b border-slate-300">
                    {product.id}
                  </td>
                  <td className="p-2 border-b border-slate-300">
                    {product.name}
                  </td>
                  <td className="p-2 border-b border-slate-300">
                    {product.description}
                  </td>
                  <td className="p-2 border-b border-slate-300">
                    {product.category.name}
                  </td>
                  <td className="p-2 text-right border-b border-slate-300">
                    {product.price}
                  </td>
                  <td className="p-2 text-center border-b border-slate-300">
                    <button
                      className="bg-slate-400 hover:bg-black text-white text-sm rounded-md py-2 px-4"
                      onClick={() => passProductId(product.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-10 border border-slate-300 px-4 py-3 rounded-md mx-5">
        <h2 className="text-slate-950 font-bold pb-5">Product Form</h2>
        {productId > 0 && (
          <div className="mb-5">
            <label className="text-sm text-slate-800 block pb-2">
              Product ID
            </label>
            <input
              className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
              type="text"
              value={productId}
              onChange={handleProductId}
              disabled={true}
            />
          </div>
        )}
        <label className="text-sm text-slate-800 block pb-2">
          Product Name
        </label>
        <input
          className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
          type="text"
          value={productName}
          onChange={handleProductName}
        />
        <label className="text-sm text-slate-800 block pb-2 mt-5">
          Product Price
        </label>
        <input
          className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
          type="number"
          value={productPrice}
          onChange={handleProductPrice}
        />
        <label className="text-sm text-slate-800 block pb-2 mt-5">
          Description
        </label>
        <textarea
          className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
          value={description}
          onChange={handleDescription}
        ></textarea>
        <label className="text-sm text-slate-800 block pb-2 mt-5">
          categories
        </label>
        <select
          className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
          value={categoryId}
          onChange={handleCategoryId}
        >
          <option value="">Select Category</option>
          {categories.map(function (category) {
            return <option value={category.id}>{category.name}</option>;
          })}
        </select>
        {productId === 0 && (
          <button
            className="bg-slate-400 hover:bg-black text-white text-sm rounded-md py-2 px-4 mt-5"
            onClick={saveProduct}
          >
            Save
          </button>
        )}
        {productId > 0 && (
          <button
            className="bg-slate-400 hover:bg-black text-white text-sm rounded-md py-2 px-4 mt-5"
            onClick={updateProduct}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
