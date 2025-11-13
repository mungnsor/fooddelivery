export const MenuItem = (props) => {
  const { categoryName, totalFood } = props;
  return (
    <button className="border border-gray-200 text-[14px] text-black rounded-full flex items-center gap-2 font-medium px-4 py-2">
      {categoryName}
      <div className="text-white bg-black rounded-full w-9 h-5">
        {totalFood}
      </div>
    </button>
  );
};
