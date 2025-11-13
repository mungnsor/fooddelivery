"use client";
import { LogoIcon } from "@/app/icons/logoIcon";
import { BoxIcon } from "../icons/boxIcon";
import { ProfileIcon } from "../icons/profileIcon";
import { useState } from "react";
export const Header = () => {
  const [addLocation, setAddLocation] = useState(false);
  const [addLocationS, setAddLocationS] = useState("");
  const [inform, setInform] = useState(false);
  const [information, setInformation] = useState("");
  const handleAddCategoryChange = async () => {
    try {
      const res = await fetch("http://localhost:8000/foodCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ categoryName: addLocationS }),
      });
      // await getData(),
      // await getFood(),
      setAddLocation(false), setAddLocationS("");
      toast("Food is being added to the cart !", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-43 w-full bg-black justify-between p-8 items-center">
      <div className="  flex items-center gap-2 text-[15px] mt-10 ">
        <LogoIcon />
        <div className="text-white">
          <div className="font-medium text-lg">SorSor</div>
          <div className="text-sm ">Swift delivery</div>
        </div>
      </div>
      <div className="flex gap-3 ">
        <div>
          <button className="h-9 w-75 rounded-full bg-white text-red-500">
            Delivery address :
            <span
              className="text-[#404040]"
              onClick={() => {
                setAddLocation(true);
              }}
            >
              {" "}
              Add location
            </span>
          </button>
        </div>
        <div className="flex gap-3">
          <button className="bg-white w-9 h-9 rounded-full flex items-center justify-center ">
            <BoxIcon />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-[#ef4444] flex items-center justify-center "
            onClick={() => {
              setInform(true);
            }}
          >
            <ProfileIcon />
          </button>
        </div>
      </div>
      {addLocation && (
        <div className="flex fixed inset-0 z-1 bg-black/25 w-full h-full justify-center items-center ">
          <div className="w-[460px] h-[262px] bg-white rounded-2xl ml-10 items-center flex flex-col">
            <div className="w-[412px] h-[52px] flex  mt-4">
              <div className="w-[366px] h-7 ml-1 text-[19px] mt-1 font-medium">
                Please write your delivery address!
              </div>
              <button
                className="w-9 h-9 bg-[#f5f5f7] rounded-2xl text-xl"
                onClick={() => setAddLocation(false)}
              >
                x
              </button>
            </div>
            <div className="w-[412px] h-28 flex flex-col  ">
              <input
                placeholder="Please share your complete address"
                className=" h-20 px-2 border "
                value={addLocationS}
                onChange={(e) => {
                  setAddLocationS(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex justify-end p-5 gap-2 ">
              <button className="w-25 h-10 border border-gray-100 text-black rounded-lg">
                Cancel
              </button>
              <button
                className="w-31 h-10 bg-black text-white rounded-lg "
                onClick={handleAddCategoryChange}
              >
                Deliver here
              </button>
            </div>
          </div>
        </div>
      )}
      {inform && (
        <div className="flex fixed inset-0 z-1 bg-black/25 w-full h-full justify-end items-start mt-17 ">
          <div className="w-[188px] h-[104px] bg-white rounded-2xl ml-10 items-center flex flex-col">
            <div className="w-[178px] h-[100px] flex  mt-4">
              <div className="w-[366px] h-7 ml-1 text-[19px] mt-1 font-medium">
                Sor@gmail.com
              </div>
              <button
                className="w-9 h-9  rounded-2xl text-xl"
                onClick={() => setInform(false)}
              >
                x
              </button>
            </div>
            <div className="w-full flex justify-center  gap-2 ">
              <button className="w-31 h-10 text-black rounded-full bg-gray-200 ">
                Signed out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
