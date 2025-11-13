import { RedPlusIcon } from "../icons/redPlusIcon";

export const CardInfo = (props) => {
  const { image, foodName, ingredients, price } = props;
  return (
    <div className="w-[398px] h-[342px] bg-white rounded-2xl flex flex-col items-center justify-evenly">
      <div className="relative flex justify-end  items-end w-[378px] h-[210px] ">
        <img
          className="w-[378px] h-[210px] object-cover hover:opacity-30 rounded-lg "
          src={image}
        />
        <button className="bg-white w-11 h-11 rounded-full flex items-center justify-center absolute z-10">
          <RedPlusIcon />
        </button>
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
