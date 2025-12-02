"use client";
import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { LogoIcon } from "@/app/icons/logoIcon";
import { MenuIcon } from "@/app/icons/menuIcon";
import { OrderIcon } from "@/app/icons/orderIcon";
import { MenuItem } from "../component/MenuItem";
import { PlusIcon } from "@/app/icons/plusIcon";
import { FoodType } from "../component/FoodType";
import { toast } from "sonner";
import Link from "next/link";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
const backend_url = process.env.PUBLIC_BACKEND_URL;
export const FoodMenus = () => {
  const path = usePathname();
  console.log(path);
  const [foodMenu, setFoodMenu] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [addFoodCategory, setAddFoodCategory] = useState("");
  const [foods, setFoods] = useState([]);
  const handleAddCategoryChange = async () => {
    try {
      const res = await fetch(`${backend_url}/foodCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ categoryName: addFoodCategory }),
      });
      await getData(),
        await getFood(),
        setAddCategory(false),
        setAddFoodCategory("");
      toast("New Category is being added to the menu", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    const data = await fetch(`${backend_url}/foodCategory`, options);
    const jsonData = await data.json();
    setFoodMenu(jsonData);
    console.log(jsonData, "category");
  };
  const getFood = async () => {
    const data = await fetch(`${backend_url}/food`, options);
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "food");
  };
  useEffect(() => {
    getData(), getFood();
  }, []);
  return (
    <div className="w-full m-auto flex ">
      <div>
        <div className="w-[250px] bg-white ml-15  ">
          <div className="w-[165px]  flex items-center gap-2 text-[15px] mt-10 ">
            <LogoIcon />
            <div>
              <div className="font-medium text-lg">SorSor</div>
              <div className="text-sm ">Swift delivery</div>
            </div>
          </div>
          <div className="w-[165px] h-[104px] px-5 mt-10 ">
            <a
              href="/admin"
              className="w-full h-10 rounded-2xl text-white flex justify-center items-center text-[13px] gap-3 bg-black"
            >
              <MenuIcon strokeColor={path == "/admin" ? "white" : ""} /> Food
              Menu
            </a>

            <a
              href="order"
              className="w-full h-10 rounded-2xl text-black flex justify-center items-center text-[13px] gap-3 mt-6"
            >
              <OrderIcon strokeColors={path == "/order" ? "gray" : "black"} />{" "}
              Orders
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center bg-gray-100">
          <div className="h-[60px] w-full justify-end flex max-w-[1800px] mt-3">
            <button className="bg-black  rounded-3xl w-9 h-9"> </button>
          </div>
          <div className="w-full max-w-[1800px] bg-white rounded-2xl mb-10 mt-15">
            <div className="flex gap-5 flex-col items-start p-6 ">
              <p className="text-[20px] font-semibold flex items-center ">
                Dishes category
              </p>
              <div className="flex gap-5">
                <div>
                  {foods && (
                    <button className="w-auto rounded-2xl pl-2 gap-2 items-center flex border p-2 h-9">
                      All dishes{" "}
                      <div className="bg-black text-white rounded-2xl w-10 mr-1 h-6 justify-center items-center">
                        {foods.length}
                      </div>
                    </button>
                  )}
                </div>
                <div className="flex gap-5">
                  {foodMenu.map((name, index) => {
                    return (
                      <MenuItem
                        categoryName={name.categoryName}
                        key={index}
                        totalFood={name.food}
                      />
                    );
                  })}
                  <div
                    onClick={() => {
                      setAddCategory(true);
                    }}
                  >
                    {" "}
                    <button className="w-9 h-9 rounded-full bg-[#Ef4444] flex items-center justify-center">
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {foodMenu.map((food, index) => {
            return (
              <FoodType
                FoodCategoryName={food.categoryName}
                totalfood={food.food}
                id={food._id}
                key={index}
              />
            );
          })}
        </div>
        {addCategory && (
          <div className="flex fixed inset-0 z-10 bg-black/25 w-full h-full justify-center items-center ">
            <div className="w-[460px] h-[262px] bg-white rounded-2xl ml-10 items-center flex flex-col">
              <div className="w-[412px] h-[52px] flex  mt-4">
                <div className="w-[366px] h-7 ml-1 text-[19px] mt-1 font-medium">
                  Add new category
                </div>
                <button
                  className="w-9 h-9 bg-[#f5f5f7] rounded-2xl text-xl"
                  onClick={() => setAddCategory(false)}
                >
                  x
                </button>
              </div>
              <div className="w-[412px] h-28 flex flex-col  ">
                <p>Category name </p>
                <input
                  placeholder="Type category name ..."
                  className=" h-14 px-2 border "
                  value={addFoodCategory}
                  onChange={(e) => {
                    setAddFoodCategory(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex justify-end p-5 ">
                <button
                  className="w-31 h-10 bg-black text-white rounded-lg "
                  onClick={handleAddCategoryChange}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
