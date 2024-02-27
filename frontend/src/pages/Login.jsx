import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import Loading from "../components/Loading";

const Login = () => {
  const { loader, successMessage, errorMessage, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);
  return (
    <div>
      {loader && <Loading />}
      <Headers />
      <div className="bg-slate-200 mt-4">
        <div className=" justify-center items-center py-10">
          <div className="w-[320px]  mx-auto bg-white rounded-md">
            <div className="px-5 py-8">
              <h2 className="text-center  text-xl text-slate-600 font-bold">Login</h2>
              <div>
                <form onSubmit={login} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      type="email"
                      className=" px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md"
                      id="email"
                      name="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="password">Passoword</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      type="password"
                      className=" px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md"
                      id="password"
                      name="password"
                      placeholder="password"
                    />
                  </div>
                  <button className="px-8 w-full  py-2 bg-orange-500 shadow-lg hover:shadow-orange-500/30 text-white rounded-md">
                    Login
                  </button>
                </form>
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p>
                  You have no account ?{" "}
                  <Link className="text-blue-500" to="/register">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
