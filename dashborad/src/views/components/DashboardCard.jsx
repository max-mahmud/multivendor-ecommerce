import React from "react";
import { MdAttachMoney, MdLocalMall, MdShoppingCart } from "react-icons/md";

const DashboardCard = ({
  Bordercolor = "",
  textColor = "",
  bgColor = "",
  ICON = MdAttachMoney,
  title = "Total Sales",
  amount = 0,
}) => {
  return (
    <div
      className={`bg-slate-50 shadow-md border-l-4 ${Bordercolor} rounded-md px-4 py-6 flex justify-between items-center text-center`}
    >
      <div>
        <h2 className={`text-3xl font-bold ${textColor}`}>${amount}</h2>
        <span className="text-md font-medium text-gray-600">{title}</span>
      </div>
      <div className={`${bgColor} rounded-full p-3`}>
        <ICON className={`${textColor} text-4xl`} />
      </div>
    </div>
  );
};

export default DashboardCard;
