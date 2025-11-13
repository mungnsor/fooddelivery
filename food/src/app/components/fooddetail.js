export const FoodDetail = (props) => {
  const { image, foodName, price, ingredients } = props;
  return (
    <div className="w-[826px] h-[412px] bg-white rounded-2xl flex flex-col items-center justify-between">
      <div className="relative flex justify-end  items-end w-[377px] h-[364px] ">
        <img
          className="w-[377px] h-[364px] object-cover hover:opacity-30 rounded-lg "
          src={image}
        />
      </div>
      <div className="w-[377px] h-[364px] flex flex-col  items-center">
        <div className="h-10 flex justify-between w-[378px] ">
          <p className="text-[#ef4444] text-[24px] ">{foodName}</p>
        </div>
        <div className="h-8 w-[378px]">{ingredients}</div>
      </div>
    </div>
  );
};
