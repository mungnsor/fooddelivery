"use client";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
import { ImageUp } from "@/app/icons/imageUp";
import { PenIcon } from "@/app/icons/penIcon";
import { TrashIcon } from "@/app/icons/trashIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UPLOAD_PRESET = "foodProject";
const CLOUD_NAME = "dchs8gfod";

export const FoodType = ({ FoodCategoryName, id, totalfood }) => {
  const [foodsType, setFoodsType] = useState([]);
  const [addFoodsType, setAddFoodsType] = useState(false);
  const [addDishChange, setAddDishChange] = useState(false);
  const [addFood, setAddFood] = useState({
    foodName: " ",
    price: " ",
    ingredients: "",
  });
  const [addDish, setAddDish] = useState({
    dishName: "",
    dishCategory: "",
    ingredients: "",
    price: "",
  });
  const [imgUrl, setImgUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
          method: "POST",

          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    console.log(event, "hahaa");

    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);

      setImgUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveInput = () => {
    setImgUrl(null);
  };

  const handleAddDish = async () => {
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          foodName: addFood.foodName,
          price: addFood.price,
          category: id,
          ingredients: addFood.ingredients,
          image: imgUrl,
        }),
      });

      await getFoodType(), setAddFoodsType(false), setAddFood("");
      toast("New dish is being added to the menu", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDishChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          foodName: addDish.dishName,
          price: addDish.price,
          category: id,
          ingredients: addDish.ingredients,
          image: imgUrl,
        }),
      });

      await getFoodType(), setAddDishChange(false), setAddDish("");
      toast("Dish successfully deleted.Would you like to undo this action?", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="bg-white max-h-fit mb-5 w-[1800px] rounded-2xl  ">
      <p className="ml-5 h-15 mt-3 flex items-center text-[20px] font-semibold ">
        {FoodCategoryName} ({totalfood})
      </p>
      <div className="w-[1700px] flex flex-wrap gap-4 ml-5 pb-5">
        <div className="w-[270px] h-[241px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center">
          <div className="flex justify-center flex-col items-center gap-4">
            <button
              className="h-9 rounded-3xl bg-[#ef4444] w-9 text-white"
              onClick={() => {
                setAddFoodsType(true);
              }}
            >
              +
            </button>
            <div className="flex flex-col justify-center items-center">
              <p>Add new dishes</p>
              <p>{FoodCategoryName}</p>
            </div>
          </div>
        </div>
        {foodsType.map((inform, index) => {
          return (
            <div
              className="w-[270px] h-[241px] border border-gray-400 rounded-2xl flex flex-col items-center justify-evenly "
              key={index}
            >
              <div className="w-[237px] h-[129px] relative flex justify-end  items-end">
                <Image
                  width={100}
                  height={100}
                  alt="image failed"
                  src={inform.image || "/amarbaysgalant.png"}
                  className="w-full h-full "
                />
                <button
                  className="bg-white w-11 h-11 rounded-full flex items-center justify-center absolute z-10"
                  onClick={() => {
                    setAddDishChange(true);
                  }}
                >
                  <PenIcon />
                </button>
              </div>
              <div className="w-[237px] h-[60px] flex flex-col justify-between items-center">
                <div className="h-5 flex justify-between w-[220px] ">
                  <p className="text-[#ef4444]">{inform.foodName}</p>
                  <p>${inform.price}</p>
                </div>
                <div className="h-8 w-[220px]">{inform.ingredients}</div>
              </div>
            </div>
          );
        })}
      </div>
      {addFoodsType && (
        <div className="flex fixed inset-0 z-10 bg-black/25 w-full h-full justify-center items-center ">
          <div className="w-[460px] h-[562px] bg-white rounded-2xl ml-10 items-center flex flex-col">
            <div className="w-[412px] h-[52px] flex mt-7">
              <div className="w-[366px] h-7 ml-1 text-[19px] mt-1 font-medium">
                Add new Dish to {FoodCategoryName}
              </div>
              <button
                className="w-9 h-9 bg-[#f5f5f7] rounded-2xl text-xl"
                onClick={() => setAddFoodsType(false)}
              >
                x
              </button>
            </div>
            <div className="w-[412px] h-15 justify-between flex">
              <div className="w-[194px] h-15">
                <p>Food</p>
                <input
                  placeholder="Type food name"
                  className="h-[38px] px-2 border rounded-lg"
                  value={addFood.foodName}
                  onChange={(e) => {
                    setAddFood({ ...addFood, foodName: e.target.value });
                  }}
                />
              </div>
              <div className="w-[194px] h-15">
                <p>Food price</p>
                <input
                  placeholder="Price"
                  className="h-[38px] px-2 border rounded-lg"
                  value={addFood.price}
                  onChange={(e) => {
                    setAddFood({ ...addFood, price: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="w-[412px] h-28 flex flex-col mt-4 ">
              <p>Ingredients</p>
              <input
                placeholder="List ingredients ..."
                className="h-70 px-2 border rounded-lg "
                value={addFood.ingredients}
                onChange={(e) => {
                  setAddFood({ ...addFood, ingredients: e.target.value });
                }}
              />
            </div>
            <div className=" flex flex-col  gap-2 justify-center h-52  mt-4">
              <p className="w-104 h-4 text-[14px] font-medium text-[#334155]">
                Food image
              </p>
              <div className="w-104 h-45 bg-blue-100 cursor-pointer rounded-lg relative ">
                {uploading && (
                  <p className="text-white flex  justify-center ">
                    Uploading...
                  </p>
                )}
                {!imgUrl ? (
                  <div className="flex justify-center items-center w-104 h-52 gap-2.5 flex-col">
                    <button className="bg-white w-9 h-9 rounded-full flex items-center justify-center">
                      <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                        <ImageUp />
                      </label>
                    </button>
                    <label>Choose a file or drag & drop it here </label>

                    <input
                      id="file-input"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleLogoUpload}
                      accept="image/*"
                    />
                  </div>
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "10px",
                      border: "none",
                      display: "block",
                    }}
                    src={imgUrl}
                    alt="Uplouded"
                  />
                )}
                <button
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "100%",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveInput}
                >
                  x
                </button>
              </div>
            </div>
            <div className="w-full flex justify-end p-7 ">
              <button
                className="w-24 h-10 bg-black text-white rounded-lg "
                onClick={handleAddDish}
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}

      {addDishChange && (
        <div className="flex fixed inset-0 z-10 bg-black/25 w-full h-full justify-center items-center ">
          <div className="w-[460px] h-[600px] bg-white rounded-2xl ml-10 items-center flex flex-col ">
            <div className="w-[412px] h-[52px] flex mt-5">
              <div className="w-[366px] h-7 ml-1 text-[19px] mt-1 font-medium">
                Dishes Info
              </div>
              <button
                className="w-9 h-9 bg-[#f5f5f7] rounded-2xl text-xl"
                onClick={() => setAddDishChange(false)}
              >
                x
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[424px] h-15 flex justify-between">
                <p className="text-[#71717a]">Dish name</p>
                <input
                  className="h-[38px] px-2 border rounded-lg w-72"
                  placeholder="food name"
                  value={addDish.dishName}
                  onChange={(e) => {
                    setAddDish({ ...addDish, dishName: e.target.value });
                  }}
                />
              </div>
              <div className="w-[424px] h-15 flex justify-between">
                <p className="text-[#71717a]">Dish category</p>
                <input
                  className="h-9 px-2 border rounded-lg w-72"
                  value={addDish.dishCategory}
                  onChange={(e) => {
                    setAddDish({ ...addDish, price: e.target.value });
                  }}
                />
              </div>

              <div className=" h-20 flex  justify-between w-[424px] ">
                <p className="text-[#71717a]">Ingredients</p>
                <input
                  placeholder="List ingredients ..."
                  className="h-20 px-2 border rounded-lg w-72 "
                  value={addDish.ingredients}
                  onChange={(e) => {
                    setAddDish({ ...addDish, ingredients: e.target.value });
                  }}
                />
              </div>
              <div className="w-[424px] h-20 flex justify-between">
                <p className="text-[#71717a]"> Price</p>
                <input
                  className="h-[38px] px-2 border rounded-lg w-72"
                  placeholder="Enter price"
                  value={addDish.price}
                  onChange={(e) => {
                    setAddDish({ ...addDish, price: e.target.value });
                  }}
                />
              </div>
              <div className=" flex   justify-center h-35 w-[424px] ">
                <p className="w-104 h-4 text-[14px] font-medium text-[#71717a]">
                  Image
                </p>
                <div className="w-72 h-29 bg-blue-100 cursor-pointer rounded-lg relative ">
                  {uploading && (
                    <p className="text-white flex  justify-center ">
                      Uploading...
                    </p>
                  )}
                  {!imgUrl ? (
                    <div className="flex justify-center items-center w-72 h-29 gap-2.5 ">
                      <button className="bg-white w-9 h-9 rounded-full flex items-center justify-center">
                        <label
                          htmlFor="file-input"
                          style={{ cursor: "pointer" }}
                        >
                          <ImageUp />
                        </label>
                      </button>

                      <input
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleLogoUpload}
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "10px",
                        border: "none",
                        display: "block",
                      }}
                      src={imgUrl}
                      alt="Uplouded"
                    />
                  )}
                  <button
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "100%",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={handleRemoveInput}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between p-5  ">
              <button className="w-12 h-10 border border-[#ef4444] rounded-sm flex items-center justify-center">
                <TrashIcon />
              </button>
              <button
                className="w-32 h-10 bg-black text-white rounded-lg "
                onClick={handleDishChange}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
