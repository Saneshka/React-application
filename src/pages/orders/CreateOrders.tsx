import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrders() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(function () {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await axios.get("http://localhost:8081/products");
    setProducts(response.data);
  }

  function addProductToOrder(product: ProductType) {
    const newArray = [...orderedProducts, product];
    setOrderedProducts(newArray);
  }

  useEffect(
    function () {
      orderedProducts.map(function (product) {
        const total = totalPrice + product.price;
        setTotalPrice(total);
      });
    },
    [orderedProducts]
  );

  const navigate = useNavigate();

  async function saveOrder() {
    try {
      const productIds: any = [];

      orderedProducts.map(function (product) {
        productIds.push(product.id);
      });
      await axios.post("http://localhost:8081/orders", {
        productIds: productIds,
      });

      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <div className="p-2 w-[300px] border-r border-slate-100">
        <div className="text-xl text-slate-800 font-semibold">Products</div>
        <div className="mt-5">
          {products.map(function (product) {
            return (
              <div
                className="p-3 mb-3 border border-slate-200 rounded-md"
                onClick={() => addProductToOrder(product)}
              >
                <div className="text-lg font-semibold text-slate-800">
                  {product.name}
                </div>
                <div className="text-sm font-semibold text-slate-600">
                  {product.category.name}
                </div>
                <div className="text-sm font-semibold text-green-400">
                  {product.price}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full p-2">
        <div className="text-xl text-slate-800  font-semibold mb-5">
          New Order
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-200 text-sm font-medium text-slate-600">
              <th className="p-2 w-[50px] text-left">#</th>
              <th className="p-2 w-[300px] text-left">Product</th>
              <th className="p-2 text-left w-[300px] text-right">
                Total Amount
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderedProducts.map(function (product) {
              return (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td className="text-right">{product.price}</td>
                </tr>
              );
            })}
            <tr>
              <td className="font-semibold" colSpan={2}>
                Grand Total
              </td>
              <td className="text-right font-semibold">{totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          <button type="button" onClick={saveOrder}>
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateOrders;
