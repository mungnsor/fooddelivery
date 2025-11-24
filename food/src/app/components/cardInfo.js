import { useEffect, useState } from "react";
import { RedPlusIcon } from "../icons/redPlusIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZuvIcon } from "../icons/zuvIcon";
export const CardInfo = (props) => {
  const { image, foodName, ingredients, price } = props;
  const [page, setPage] = useState(1);
  const [added, setAdded] = useState(false);
  const [saveFood, setSaveFood] = useState(() => {
    const saved = localStorage.getItem("savedFoods");
    return saved ? JSON.parse(saved) : [];
  });

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
  const handle = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("savedFoods")) || [];
    const newItem = { image, foodName, ingredients, price, page };

    const updatedList = [...saved, newItem];
    setSaveFood(updatedList);
    localStorage.setItem("savedFoods", JSON.stringify(updatedList));

    setAdded(true);
  };
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedFoods")) || [];

    const exists = saved.some((item) => item.foodName === foodName);

    if (exists) {
      setAdded(true);
    }
  }, [foodName]);

  return (
    <div className="w-[398px] h-[342px] bg-white rounded-2xl flex flex-col items-center justify-evenly">
      <div className="relative flex justify-end  items-end w-[378px] h-[210px] ">
        <img
          className="w-[378px] h-[210px] object-cover hover:opacity-30 rounded-lg "
          src={image}
        />
        <div className="absolute bottom-5 right-5">
          <Dialog className="">
            <form>
              <DialogTrigger asChild>
                <button
                  className={`w-11 h-11 rounded-full flex items-center justify-center 
                   ${added ? "bg-black" : "bg-white"}`}
                >
                  {added ? <ZuvIcon /> : <RedPlusIcon />}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-fit! rounded-2xl">
                <DialogTitle></DialogTitle>
                <div className="w-[826px] h-[412px] bg-white rounded-3xl flex  items-center justify-between ">
                  <div className="relative flex justify-end  items-end w-[387px] h-[364px] rounded-full ">
                    <img
                      className="w-[387px] h-[364px] object-cover hover:opacity-30  p-4 rounded-2xl "
                      src={image}
                    />
                  </div>
                  <div className="w-[377px] h-[364px] flex flex-col items-center mr-5 ">
                    <div className="flex gap-5 flex-col py-5 ">
                      <div className="flex justify-end mr-4">
                        <DialogClose>
                          <div className="w-9 h-9 border border-gray-300 rounded-full text-xl ">
                            x
                          </div>
                        </DialogClose>
                      </div>
                      <div className=" flex  w-[377px] flex-col h-24 ">
                        <p className="text-[#ef4444] text-[30px] ">
                          {foodName}
                        </p>

                        <div className="h-8 w-[378px] text-[16px]">
                          {ingredients}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between w-full h-full">
                          <div>
                            <p>Total price </p>
                            <p className="text-[24px] font-semibold">
                              ${price * page}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              className="w-11 h-11 rounded-full flex items-center justify-center border-gray-300 border"
                              onClick={handleBackButton}
                            >
                              -
                            </button>
                            <button className="w-9 h-9 "> {page}</button>
                            <button
                              className=" w-11 h-11 rounded-full flex items-center justify-center border-gray-300 border"
                              onClick={handleNextButton}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <button
                            className="w-[377px] h-12 bg-black rounded-full text-white flex items-center justify-center"
                            onClick={handle}
                          >
                            Add to card
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <div className="w-[378px] h-[60px] flex flex-col justify-between items-center">
        <div className="h-10 flex justify-between w-[378px] ">
          <p className="text-[#ef4444] text-[24px] ">{foodName}</p>
          <p className="text-[18px] font-semibold">${price}</p>
        </div>
        <div className="h-8 w-[378px]">{ingredients}</div>
      </div>
    </div>
  );
};
