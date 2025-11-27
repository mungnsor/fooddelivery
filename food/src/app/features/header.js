"use client";
import { LogoIcon } from "@/app/icons/logoIcon";
import { BoxIcon } from "../icons/boxIcon";
import { ProfileIcon } from "../icons/profileIcon";
import { useState } from "react";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageIcon } from "../icons/package";
import { SaveFood } from "../components/saveFood";
import { Textarea } from "@/components/ui/textarea";
import { PictureIcon } from "../icons/pictureIcon";
import { EmpthyCard } from "../components/empthy";
import { Order } from "../components/order";
export const Header = ({ quantity }) => {
  const [addLocation, setAddLocation] = useState(false);
  const [addLocationS, setAddLocationS] = useState("");
  const [inform, setInform] = useState(false);
  const [address, setAddress] = useState("");
  const [saveFood, setSaveFood] = useState([]);
  console.log(saveFood, "tt");

  // const handleAddCategoryChange = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/foodCategory", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //       },
  //       body: JSON.stringify({ categoryName: addLocationS }),
  //     });
  //     setAddLocation(false), setAddLocationS("");
  //     toast("Food is being added to the cart !", {
  //       position: "top-center",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const totalPrice = saveFood.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const handleCheckout = async () => {
    if (address.trim() === "") {
      toast("Please enter your delivery address!", { position: "top-center" });
      return;
    }
    const orderData = {
      user: localStorage.getItem("userId"),
      totalPrice: totalPrice + 10,
      foodOrderItems: saveFood,
      address: address,
      status: "PENDING",
    };
    try {
      await fetch("http://localhost:8000/foodOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      console.log("Order saved to backend!");
      localStorage.removeItem("savedFoods");
      setSaveFood([]);
    } catch (err) {
      console.log("Error saving order:", err);
    }
  };
  const handleDelete = (index) => {
    const newData = saveFood.filter((_, i) => i !== index);
    setSaveFood(newData);
    localStorage.setItem("savedFoods", JSON.stringify(newData));
  };
  const handleSaveAddress = () => {
    if (addLocationS.trim() === "") return;

    setAddress(addLocationS);
    localStorage.setItem("deliveryAddress", addLocationS);
    setAddLocation(false);
    setAddLocationS("");
  };
  useEffect(() => {
    const saved = localStorage.getItem("savedFoods");
    if (saved) setSaveFood(JSON.parse(saved));

    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) setAddress(savedAddress);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedFoods", JSON.stringify(saveFood));
  }, [saveFood]);

  useEffect(() => {
    localStorage.setItem("deliveryAddress", address);
  }, [address]);

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

        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-white w-9 h-9 rounded-full flex items-center justify-center ">
              <BoxIcon />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[555px] ">
            <SheetTitle className="text-white flex gap-3">
              <PackageIcon />
              Order detail
            </SheetTitle>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <Tabs defaultValue="account">
                <TabsList className="w-135">
                  <TabsTrigger value="account">Card</TabsTrigger>
                  <TabsTrigger value="password">Order</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="w-145 ">
                  <div className="w-135 mt-5 h-175 flex rounded-2xl text-xl items-center flex-col justify-around bg-white">
                    <div className=" h-[90%] w-120 flex justify-start flex-col mt-3 ">
                      <div className="text-[#71717A] h-10 text-2xl w-115 font-semibold ">
                        My card
                      </div>
                      {saveFood.length === 0 ? (
                        <EmpthyCard />
                      ) : (
                        saveFood.map((save, index) => (
                          <SaveFood
                            key={index}
                            index={index}
                            image={save.image}
                            foodName={save.foodName}
                            ingredients={save.ingredients}
                            price={save.price}
                            count={save.quantity}
                            id={save.id}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                    <div className="w-120 h-40  flex  justify-between  flex-col">
                      <div className="text-[#71717A] h-11 text-xl flex items-end  font-semibold ">
                        Delivery location
                      </div>
                      <div className=" h-26  flex flex-col justify-between">
                        {" "}
                        <Textarea
                          className="border border-[#E4E4E7] w-120 h-10"
                          placeholder="Please share your complete address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <p className=" text-sm text-[#EF4444] h-8 ml-1">
                          Please complete your address
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white w-135 h-64 rounded-2xl mt-10 flex justify-center items-center">
                    <div className="h-[90%] w-121  flex flex-col justify-between">
                      <div className="text-[#8b8b90] h-10 text-[23px] w-124 font-semibold flex mr-4  ">
                        Payment info
                      </div>
                      <div className="w-120  h-58  flex justify-around flex-col mt-2 mr-3 ">
                        <div className="h-[54%] flex flex-col justify-between ">
                          <div className=" h-18  flex flex-col justify-between ">
                            <div className="flex justify-between">
                              <p className="h-9  flex text-[18px] items-center text-[#71717a] font-normal">
                                Items
                              </p>
                              <p className="font-bold text-[16px] ">
                                ${totalPrice}
                              </p>
                            </div>

                            <div className="flex justify-between">
                              <p className="h-9  text-[18px] flex items-center text-[#71717a] font-normal">
                                Shipping
                              </p>
                              <p className="font-bold text-[16px]">$10</p>
                            </div>
                          </div>
                          <div className="h-5  flex items-center">
                            <div className="w-full border border-dashed border-[#09090B80]"></div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <p className="h-9  text-[18px] flex items-center text-[#71717a] font-normal">
                            Total
                          </p>
                          <p className="font-bold text-[16px]">
                            ${totalPrice + 10}
                          </p>
                        </div>
                        <Dialog>
                          <form>
                            <DialogTrigger asChild>
                              <button
                                className="w-full h-10 bg-[#EF4444] cursor-pointer flex items-center justify-center rounded-2xl"
                                onClick={handleCheckout}
                              >
                                <p className="text-white font-medium">
                                  Checkout
                                </p>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="w-[664px] h-[439px] rounded-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex justify-center items-center mt-10 font-semibold text-[24px] ">
                                  Your order has been successfully placed !
                                </DialogTitle>
                                <div className="flex justify-center items-center">
                                  <PictureIcon />
                                </div>
                                <div className="flex justify-center items-center">
                                  <button className="w-[188px] h-11 flex justify-center items-center bg-[#f4f4f5] text-black rounded-full">
                                    Back to Home
                                  </button>
                                </div>
                              </DialogHeader>
                            </DialogContent>
                          </form>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="password" className="w-145">
                  <div className="w-135 mt-5 h-230 flex rounded-2xl text-xl items-center flex-col justify-around bg-white">
                    <div className=" h-[95%] w-120 flex justify-start flex-col ">
                      <div className="text-[#71717A] h-10 text-2xl w-115 font-semibold ">
                        Order history
                      </div>
                      <Order />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>

        <button
          className="w-9 h-9 rounded-full bg-[#ef4444] flex items-center justify-center "
          onClick={() => {
            setInform(true);
          }}
        >
          <ProfileIcon />
        </button>
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
                onClick={handleSaveAddress}
              >
                Deliver here
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {inform && (
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
              <Link href={"/login"}>
                <button className="w-31 h-10 text-black rounded-full bg-gray-200 ">
                  Signed out
                </button>
              </Link>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
