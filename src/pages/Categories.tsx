import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [categoryName, setCategoryName] = useState<String>("");

  function handleCategoryName(event: any) {
    setCategoryName(event.target.value);
  }

  useEffect(function () {
    loadCategories();
  }, []);

  async function loadCategories() {
    const apiResponse = await axios.get("http://localhost:8081/categories");
    setCategories(apiResponse.data);
  }

  async function addCategory() {
    await axios.post("http://localhost:8081/categories", {
      name: categoryName,
    });
    loadCategories();
  }
  return (
    <div className="container mx-auto py-5 w-full">
      <h1 className="font-semibold text-red-500 py-2">Categories</h1>

      {/* <button onClick={loadCategories}>Load Categories</button> */}

      <ul>
        {categories.map((category) => (
          <li className="inline-block px-3 py-2 me-3 border border-slate-500 rounded-lg shadow-lg">
            {category.name}
          </li>
        ))}
      </ul>
      <div className="mt-10 w-[650px] border border-slate-300 px-4 py-3 rounded-md">
        <h2 className="text-slate-950 font-bold pb-5">Category Form</h2>
        <label className="text-sm text-slate-800 block pb-2">
          Enter Category
        </label>
        <input
          className="border border-slate-300 rounded-md text-sm py-1 px-2 w-full"
          type="text"
          onChange={handleCategoryName}
        />

        <button
          className="bg-slate-400 rounded-md p-2 text-sm mt-5 mr-2  text-white hover:bg-black"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}
export default Categories;
