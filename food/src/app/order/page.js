"use client";
import { OrderIcon } from "../icons/orderIcon";
import { MenuIcon } from "../icons/menuIcon";
import { LogoIcon } from "../icons/logoIcon";
import { DownIcon } from "../icons/downIcon";
import { LeftIcon } from "../icons/leftIcon";
import { RigthIcon } from "../icons/rigthIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
export default function Home({ userId }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const handleNextButton = () => {
    setPage(page + 1);
  };
  const handleBackButton = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch("http://localhost:8000/foodOrder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          status,
          id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const id = userId || localStorage.getItem("userId");
        if (!id) return;
        const res = await fetch(`http://localhost:8000/foodOrder`, {
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
    <div className="w-full flex  m-auto">
      <div className="w-[250px] ml-15">
        <div className="w-[165px] flex items-center gap-2 text-[15px] mt-10 ">
          <LogoIcon />
          <div>
            <div className="font-medium text-lg">SorSor</div>
            <div className="text-sm ">Swift delivery</div>
          </div>
        </div>
        <div className="w-[165px] h-[104px] px-5 mt-10">
          <a
            href="/admin"
            className="w-full h-10 rounded-2xl text-black flex justify-center items-center text-[13px] gap-3"
          >
            <MenuIcon /> Food Menu
          </a>
          <a
            href="/order"
            className="w-full h-10 rounded-2xl text-white flex justify-center items-center text-[13px] gap-3 mt-6 bg-black"
          >
            <OrderIcon /> Orders
          </a>
        </div>
      </div>
      <div className="w-full flex items-center  bg-gray-100">
        <div className="w-full flex flex-col py-5 h-full items-center">
          <div className="h-[60px] w-full justify-end flex max-w-[1171px]">
            <button className="bg-black  rounded-3xl w-9 h-9"> </button>
          </div>
          <div className="w-[1171px] bg-white border border-gray-200 rounded-md h-fit">
            <div className="flex justify-between items-center w-full h-[76px]">
              <div className="w-[485px] h-11 ml-3">
                <div className="text-[20px] font-semibold">Orders</div>
                <div>{orders.length} items</div>
              </div>
              <div className="w-[525px] h-11 mr-4 flex items-center justify-between">
                <button className="flex items-center justify-center w-[300px] h-9 text-[15px] border border-gray-200 rounded-2xl">
                  <div>
                    <input type="date"></input>
                  </div>
                  <div className="ml-5">
                    <input type="date"></input>
                  </div>
                </button>
                <button className="bg-black border w-[213px] h-9 text-white rounded-full">
                  Change delivery state
                </button>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className=" border border-gray-200 h-15  flex">
                <div className="w-12 h-full flex justify-center items-center">
                  <input type="checkbox"></input>
                </div>
                <div className="w-14 h-full flex justify-center items-center">
                  №
                </div>
                <div className="w-[213px] h-full flex justify-center items-center">
                  Customer
                </div>
                <div className="w-40 h-full flex justify-center items-center">
                  Food
                </div>
                <div className="w-40 h-full flex justify-center items-center">
                  Date
                </div>
                <div className="w-[213px] h-full flex justify-center items-center">
                  Total
                </div>
                <div className="w-[213px] h-full flex justify-center items-center">
                  Delivery address
                </div>
                <div className="w-40 h-full flex justify-center items-center">
                  Delivery state
                </div>
              </div>
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-[1171px] h-15 flex border border-gray-200 gap-3"
                >
                  <div className="w-12 h-full flex items-center justify-center">
                    <input type="checkbox"></input>
                  </div>
                  <div className="w-14 h-full flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="w-[213px] h-full flex justify-center items-center">
                    {order.user.email}
                  </div>
                  <div className="w-20  h-full flex items-center ">
                    <div className="flex justify-between items-center gap-2 w-25 h-8">
                      {order.foodOrderItems.length} food <DownIcon />
                    </div>
                  </div>
                  <div className="w-40 h-full flex justify-center items-center">
                    {order.createdAt?.slice(0, 10)}
                  </div>
                  <div className="w-40 h-full flex justify-center items-center">
                    ${order.totalPrice}
                  </div>
                  <div className="w-[213px] h-full flex justify-center items-center">
                    {order.user.address}
                  </div>
                  <div className="w-28 h-full flex items-center justify-center">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(order._id, value)
                      }
                      className="w-[68px]"
                    >
                      <SelectTrigger>
                        <SelectValue className="border border-red-400 rounded-2xl px-2 flex gap-2 h-8 items-center cursor-pointer">
                          <SelectValue />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELED">Canceled</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[70px] flex gap-2 max-w-[1171px] w-full justify-end mt-4">
            <button
              className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl "
              onClick={handleBackButton}
            >
              <LeftIcon />
            </button>
            <button className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl ">
              {page}
            </button>
            <button
              className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl "
              onClick={handleNextButton}
            >
              <RigthIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
