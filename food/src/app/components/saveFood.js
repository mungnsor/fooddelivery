"use client";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
import { useState } from "react";
import { useEffect } from "react";
export const SaveFood = ({
  image,
  foodName,
  ingredients,
  price,
  id,
  count,
}) => {
  const [foodsType, setFoodsType] = useState([]);
  const [addDishChange, setAddDishChange] = useState(null);
  const [page, setPage] = useState(count);
  const getFoodType = async () => {
    const data = await fetch(
      `http://localhost:8000/food/findByCategory/${id}`,
      options
    );
    const jsonData = await data.json();
    setFoodsType(jsonData), console.log("food", jsonData);
  };

  useEffect(() => {
    getFoodType();
  }, []);
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
  const handleDishDelete = async () => {
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          id: addDish._id,
        }),
      });
      await getFoodType(),
        setAddDishChange(false),
        toast("Dish successfully deleted.", {
          position: "top-center",
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = () => {
    setAddDishChange(null);
  };
  return (
    <div className="w-full   overflow-scroll ">
      <div className="w-120  border-dashed border-b border-[#09090B80] h-30 flex  mb-5 gap-2 ">
        <div className="w-[30%]  h-23 border rounded-2xl">
          <img className="w-full h-full" src={image} />
        </div>
        <div className="flex flex-col w-[70%] h-25 ">
          <div className="  h-35 flex justify-between">
            <div className=" w-[55%] h-20">
              <p className="text-[#EF4444] text-base">{foodName}</p>
              <p className="text-xs text-black">{ingredients}</p>
            </div>
            <button
              className="h-7 w-7 border rounded-full flex justify-center items-center border-red-500 cursor-pointer text-red-500"
              onClick={handleDelete}
            >
              x
            </button>
          </div>
          <div className="w-[330px] gap-3 flex justify-between">
            <div className="flex gap-1.5">
              <button
                className="w-11 h-11 rounded-full flex items-center justify-center"
                onClick={handleBackButton}
              >
                -
              </button>
              <button className="w-9 h-9 "> {page}</button>
              <button
                className=" w-11 h-11 rounded-full flex items-center justify-center"
                onClick={handleNextButton}
              >
                +
              </button>
            </div>
            <div className="font-bold text-[16px] ">${price * page}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
