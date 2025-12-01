"use client";

import { useState } from "react";
import { CardInfo } from "../components/cardInfo";
import { useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const Card = ({ categoryName, categoryId, totalfood }) => {
  const [foodsType, setFoodsType] = useState([]);
  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const getFood = async () => {
    const data = await fetch(
      `${backend_url}/food/findByCategory/${categoryId}`,
      options
    );
    const jsonData = await data.json();
    setFoodsType(jsonData);
    console.log(jsonData, "foodlllll");
  };

  useEffect(() => {
    getFood();
  }, []);
  return (
    <div className="w-full bg-[#404040] overflow-hidden ">
      <div className=" m-auto  max-w-[1264px] mb-15 mt-10 ">
        <div className="w-full flex justify-center mt-5  ">
          <div className="w-full flex  flex-col">
            <div className="w-full flex justify-between">
              <div className="w-60 ml-2 text-2xl font-semibold text-white">
                {categoryName} ({totalfood})
              </div>
            </div>
            <div className="grid grid-cols-3 w-full mt-2 justify-around gap-5  items-center">
              {foodsType.map((inform, index) => {
                return (
                  <CardInfo
                    key={index}
                    image={inform.image}
                    price={inform.price}
                    foodName={inform.foodName}
                    ingredients={inform.ingredients}
                    foodId={inform._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
