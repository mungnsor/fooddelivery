import { useEffect, useState } from "react";
import { LogoIcon } from "../icons/logoIcon";
import { DateIcon } from "../icons/dateIcon";
import { LocationIcon } from "../icons/locationIcon";
import { CupIcon } from "../icons/cupIcon";
export const Order = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const id = userId || localStorage.getItem("userId");
        if (!id) return;
        const res = await fetch(`http://localhost:8000/foodOrder/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("orderData", data);

        setOrders(data);
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);
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
        <div key={order._id} className=" p-4 rounded-lg mb-4">
          <div className="  border-dashed border-b border-[#09090B80] ">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <p className="font-semibold"> ${order.totalPrice}</p>
                <p className="font-semibold"> (#{index + 1})</p>
              </div>
              <div className="border border-red-400 rounded-2xl px-2 flex gap-2 h-8 items-center cursor-pointer text-[12px] font-semibold">
                {order.status}
              </div>
            </div>
            <div className="mt-2">
              {order.foodOrderItems?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex items-center gap-2.5">
                    <p>
                      <CupIcon />
                    </p>
                    <p>{item.food.foodName}</p>
                  </div>
                  <div>
                    <p>x{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <p>
                <DateIcon />
              </p>
              <p>{order.createdAt?.slice(0, 10)}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <p>
                <LocationIcon />
              </p>
              <p> {order.user.address || "unknown"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
