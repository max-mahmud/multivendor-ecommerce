import React, { forwardRef, useEffect, useState } from "react";
import { RiMoneyCnyBoxFill } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import toast from "react-hot-toast";
import moment from "moment";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller_payemt_details,
  messageClear,
  send_withdrowal_request,
} from "../../store/Reducers/paymentReducer";
import PaymentCard from "../components/PaymentCard";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => <div ref={ref} onWheel={handleOnWheel} {...props} />);

const Payments = () => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows,
    successWithdrows,
    totalAmount,
    withdrowAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(get_seller_payemt_details(userInfo._id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(send_withdrowal_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("insufficient balance");
    }
  };

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">${pendingWithdrows[index]?.amount}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-xs">
            {pendingWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdrows[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">${successWithdrows[index]?.amount}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-xs">
            {successWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(successWithdrows[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <PaymentCard
          Icon={RiMoneyCnyBoxFill}
          text="Total Sales"
          bgColor="bg-yellow-500/50"
          bgColor2="bg-yellow-500"
          amount={totalAmount}
        />
        <PaymentCard
          Icon={FaMoneyBill}
          text="Avaiable Amount"
          bgColor="bg-green-500/50"
          bgColor2="bg-green-500"
          amount={availableAmount}
        />
        <PaymentCard
          Icon={RiMoneyDollarBoxFill}
          text="Withdrawal Amount"
          bgColor="bg-sky-500/50"
          bgColor2="bg-sky-500"
          amount={withdrowAmount}
        />
        <PaymentCard
          Icon={RiMoneyPoundBoxFill}
          text="Pending amount"
          bgColor="bg-orange-500/50"
          bgColor2="bg-orange-500"
          amount={pendingAmount}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
        <div className="bg-slate-100 shadow   text-slate-700  rounded-md p-5">
          <h2 className="text-lg">Send withdrawal Request</h2>
          <div className="py-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  value={amount}
                  min="0"
                  type="number"
                  className="px-3 md:w-[70%] py-2 focus:border-orange-500 outline-none bg-slate-100 shadow border border-slate-700 rounded-md text-slate-700"
                  name="amount"
                />
                <button
                  disabled={loader}
                  className="bg-orange-500 hover:shadow-orange-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2 text-sm "
                >
                  {loader ? (
                    <span className="flex gap-2 items-center">
                      loading..
                      <LuLoader2 className="animate-spin" size={22} />
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className=" text-slate-700">
            <h2 className="text-lg pb-4">Pending withdrawal request</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-slate-300 uppercase text-xs min-w-[340px] font-medium">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={pendingWithdrows.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className="bg-slate-100 shadow  text-slate-700 rounded-md p-5">
          <div>
            <h2 className="text-lg pb-4">Success Withdrawal</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-slate-300 uppercase text-xs font-medium min-w-[340px]">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={successWithdrows.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
