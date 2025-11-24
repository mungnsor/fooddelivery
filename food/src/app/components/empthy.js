import { LogoIcon } from "../icons/logoIcon";

export const EmpthyCard = () => {
  return (
    <div className="bg-gray-50 w-[489px] h-[182px] rounded-2xl">
      <div className="flex justify-center items-center flex-col gap-3 mt-8">
        <LogoIcon />
        <p className="font-bold text-[16px] ">Your card is empthy</p>
        <p className="text-[12px] font-normal">
          Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
          cravings!
        </p>
      </div>
    </div>
  );
};
