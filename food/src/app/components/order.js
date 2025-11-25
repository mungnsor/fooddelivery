import { useEffect, useState } from "react";
import { LogoIcon } from "../icons/logoIcon";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/foodOrder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      {orders.length === 0 && (
        <div className="bg-gray-50 w-[489px] h-[182px] rounded-2xl">
          <div className="flex justify-center items-center flex-col gap-3 mt-8">
            <LogoIcon />
            <p className="font-bold text-[16px] ">No Orders Yet?</p>
            <p className="text-[12px] font-normal h-8">
              🍕 You haven't placed any orders yet. Start exploring our menu!
            </p>
          </div>
        </div>
      )}
      {orders.map((order, index) => (
        <div key={order._id} className="border p-4 rounded-lg mb-4">
          <p className="font-semibold">Order #{index + 1}</p>
          <p>Date: {order.createdAt?.slice(0, 10)}</p>
          <p>Address: {order.address || "Unknown"}</p>
          <p>Total: ${order.totalPrice}</p>
          <div className="mt-2">
            {order.foodOrderItems?.map((item, idx) => (
              <p key={idx}>
                • {item.foodName} × {item.page}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
