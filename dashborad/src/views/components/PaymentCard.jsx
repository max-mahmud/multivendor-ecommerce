import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";

const PaymentCard = ({
  amount = 0,
  text = "Total Sales",
  bgColor = "",
  bgColor2 = "",
  Icon = BsCurrencyDollar,
}) => {
  return (
    <div className={`flex justify-between  ${bgColor}  items-center p-5 shadow rounded-md gap-3`}>
      <div className="flex flex-col justify-start items-start font-bold text-slate-700">
        <h2 className="text-lg font-bold">${amount}</h2>
        <span className="text-sm font-normal">{text}</span>
      </div>
      <div className={`w-[46px] h-[47px] rounded-full ${bgColor2} flex justify-center items-center text-xl`}>
        <Icon className={`shadow-lg`} color="white" />
      </div>
    </div>
  );
};

export default PaymentCard;
