import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  async function loadOrders() {
    const response = await axios.get("http://localhost:8081/orders");
    setOrders(response.data);
  }

  useEffect(function () {
    loadOrders();
  }, []);

  return (
    <div className="container mx-auto">
      <h1>Orders</h1>
      <div className="mx-10">
        <table className="table-auto w-full pb-2">
          <thead>
            <tr className="bg-slate-200 text-sm font-semibold text-slate-600">
              <th className="p-2 w-[200px] text-left">ID</th>
              <th className="p-2 w-[200px] text-left">Date</th>
              <th className="p-2 w-[200px] text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(function (order) {
              return (
                <tr>
                  <td className="p-2 border-b border-slate-300">{order.id}</td>
                  <td className="p-2 border-b border-slate-300">
                    {order.orderDateTime}
                  </td>
                  <td className="p-2 border-b border-slate-300">
                    {order.totalPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Orders;
