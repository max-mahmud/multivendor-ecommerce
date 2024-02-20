import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";

const PaymentCard = ({
  amount = 0,
  text = "Total Sales",
  color = "green",
  bgColor = "bg-green-700/20",
  Icon = BsCurrencyDollar,
}) => {
  return (
    <div
      style={{ borderColor: color }}
      className={`flex justify-between items-center border-l-4 p-5 bg-slate-100 shadow rounded-md gap-3`}
    >
      <div className="flex flex-col justify-start items-start text-slate-700">
        <h2 className="text-lg font-bold">${amount}</h2>
        <span className="text-sm font-normal">{text}</span>
      </div>
      <div className={`w-[46px] h-[47px] rounded-full ${bgColor} flex justify-center items-center text-xl`}>
        <Icon className={`shadow-lg`} style={{ color: color }} />
      </div>
    </div>
  );
};

export default PaymentCard;
