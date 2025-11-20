import { RedX } from "../icons/redX";

export const MyCard = (props) => {
  const { image, foodName, price, ingredients } = props;
  return (
    <div className="w-[419px] h-[120px] bg-amber-300 rounded-2xl flex  items-center justify-between">
      <div className="relative flex justify-start  items-start w-[114px] h-[120px] ">
        <img
          className="w-[114px] h-[120px] object-cover hover:opacity-30 rounded-lg "
          src={image}
        />
      </div>
      <div className="w-[310px] h-[120px] flex flex-col  items-center">
        <div className="flex justify-between w-[305px] h-[60px] ">
          <div className=" flex  w-[305px] flex-col h-15 ">
            <p className="text-[#ef4444] text-[16px] ">{foodName}</p>

            <div className="h-8 w-[377px] text-[12px] ">{ingredients}</div>
          </div>
          <button className="w-9 h-9 border rounded-full border-[#ef4444] flex items-center justify-center">
            <RedX />
          </button>
        </div>
        <div className="flex justify-between w-full h-9">
          <div className="flex gap-2">
            <button className="w-9 h-9  ">-</button>
            <p className="text-[18px] font-semibold">1</p>
            <button className="w-9 h-9">+</button>
          </div>
          <div className="text-[16px] font-bold">${price}</div>
        </div>
      </div>
    </div>
  );
};
