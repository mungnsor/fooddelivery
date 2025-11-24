import { LogoIcon } from "../icons/logoIcon";

export const EmpthyOrder = () => {
  return (
    <div className="bg-gray-50 w-[489px] h-[182px] rounded-2xl">
      <div className="flex justify-center items-center flex-col gap-3 mt-8">
        <LogoIcon />
        <p className="font-bold text-[16px] ">No Orders Yet?</p>
        <p className="text-[12px] font-normal">
          🍕 "You haven't placed any orders yet. Start exploring our menu and
          satisfy your cravings!"
        </p>
      </div>
    </div>
  );
};
