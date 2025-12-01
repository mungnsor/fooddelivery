"use client";
import { LogoIcon } from "@/app/icons/logoIcon";
import { Menu } from "../components/Menu";
import { useState } from "react";
import { useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const Footer = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const getData = async () => {
    const data = await fetch(`${backend_url}/foodCategory`, options);
    const jsonData = await data.json();
    setFoodMenu(jsonData);
    console.log(jsonData, "category");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex w-full h-169 bg-black flex-col p-20">
      <div className="w-full h-20 bg-[#EF4444] justify-center items-center flex overflow-hidden ">
        <div className="w-full  text-white text-3xl animation-scroll whitespace-nowrap gap-2 font-semibold">
          {Array(10)
            .fill("Fresh fast delivered")
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center  px-22 pt-19  ">
        <div className="h-57 w-[1264px] flex  justify-between  ">
          <div className="  flex  gap-2 text-[15px]  flex-col ">
            <LogoIcon />
            <div className="text-white">
              <div className="font-medium text-lg text-red-500">SorSor</div>
              <div className="text-sm ">Swift delivery</div>
            </div>
          </div>
          <div className="flex gap-10 text-[#71717a] h-57 ">
            <div className="flex gap-4 flex-col ">
              <p>SORSOR</p>
              <div className="flex gap-3 flex-col text-white">
                <p>Home</p>
                <p>Contact us</p>
                <p>Delivery zone</p>
              </div>
            </div>
            <div className="flex gap-4 flex-col ">
              <p>MENU</p>
              <div className="flex gap-3  text-white flex-col  flex-wrap">
                {foodMenu.map((name, index) => {
                  return <Menu categoryName={name.categoryName} key={index} />;
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="mr-5 text-[#71717a]">Follow Us</p>
            <div className="flex gap-3 w-18">
              <img src="./facebook.png" />
              <img src="./ig.png" />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex  items-center justify-center px-22  ">
        <div className="h-22 w-[1264px] flex text-[#71717a] gap-10 ">
          <div className="flex flex-row gap-1 items-center">
            <p>Copy right 2024</p>
            <p>Nomnom LLC</p>
          </div>
          <div className="flex flex-row gap-10 items-center">
            <p>Privacy policy </p>
            <p>Terms and conditoin</p>
            <p>Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
