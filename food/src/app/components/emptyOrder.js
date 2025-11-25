import { useEffect, useState } from "react";
import { LogoIcon } from "../icons/logoIcon";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("orderHistory");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  return (
    <div>
      {orders.length === 0 && (
        <div className="bg-gray-50 w-[489px] h-[182px] rounded-2xl">
          <div className="flex justify-center items-center flex-col gap-3 mt-8">
            <LogoIcon />
            <p className="font-bold text-[16px] ">No Orders Yet?</p>
            <p className="text-[12px] font-normal h-8">
              🍕 "You haven't placed any orders yet. Start exploring our menu
              and satisfy your cravings!"
            </p>
          </div>
        </div>
      )}
      {orders.map((order, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4">
          <p className="font-semibold">Order #{index + 1}</p>
          <p>Date: {order.date}</p>
          <p>Address: {order.address}</p>
          <p>Total: ${order.total}</p>

          <div className="mt-2">
            {order.items.map((i, idx) => (
              <p key={idx}>
                • {i.foodName} × {i.page}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
