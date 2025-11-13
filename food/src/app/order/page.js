"use client";
import { OrderIcon } from "../icons/orderIcon";
import { MenuIcon } from "../icons/menuIcon";
import { LogoIcon } from "../icons/logoIcon";

import { DownIcon } from "../icons/downIcon";
import { DownUpIcon } from "../icons/downupIcon";
import { LeftIcon } from "../icons/leftIcon";
import { RigthIcon } from "../icons/rigthIcon";
import { usePathname } from "next/navigation";
export default function Home() {
  const path = usePathname();
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
                <div>32 items</div>
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
                  Customizer
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
              <div className="w-[1171px] h-15 flex border border-gray-200">
                <div className="w-12 h-full flex items-center justify-center">
                  <input type="checkbox"></input>
                </div>
                <div className="w-14 h-full flex justify-center items-center">
                  1
                </div>
                <div className="w-[213px] h-full flex justify-center items-center">
                  sor
                </div>
                <div className="w-40  h-full flex items-center justify-end">
                  <div className="flex justify-between items-center gap-2 w-25 h-8">
                    2 food <DownIcon />
                  </div>
                </div>
                <div className="w-40 h-full flex justify-center items-center">
                  Date
                </div>
                <div className="w-40 h-full flex justify-center items-center">
                  26.87$
                </div>
                <div className="w-[213px] h-full flex justify-center items-center">
                  SVJ
                </div>
                <div className="w-55 h-full flex items-center justify-center">
                  <button className="border border-red-400 rounded-2xl px-2 flex gap-2 h-8 items-center">
                    Pending <DownUpIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[70px] flex gap-2 max-w-[1171px] w-full justify-end mt-4">
            <button className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl ">
              <LeftIcon />
            </button>
            <button className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl ">
              1
            </button>
            <button className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl ">
              2
            </button>
            <button className="w-8 h-8 flex bg-white justify-center items-center rounded-2xl ">
              <RigthIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
