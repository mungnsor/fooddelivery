export const Menu = (props) => {
  const { categoryName } = props;
  return (
    <div className=" text-[14px] text-white   font-medium ">{categoryName}</div>
  );
};
