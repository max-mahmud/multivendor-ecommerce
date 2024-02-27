import React, { useEffect } from "react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { MdDiversity3, MdForest, MdGeneratingTokens } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_dashboard_index_data } from "../../store/Reducers/dashboardIndexReducer";
import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const { totalSale, totalOrder, totalProduct, totalSeller, recentOrders } = useSelector(
    (state) => state.dashboardIndex
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_admin_dashboard_index_data());
  }, []);

  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: "Sales",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8", "#00cfe8"],
      chart: {
        background: "transparent",
        foreColor: "#1c1c1c",
        stacked: true,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      lineCap: "round",
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          },
        },
      ],
    },
  };

  const doughnutChartState = {
    series: [30, 40, 20, 10],
    options: {
      labels: ["Shoes", "Computer", "Dress", "Phones"],
      colors: ["#FF4560", "#008FFB", "#00E396", "#775DD0"],
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        foreColor: "#1c1c1c",
      },
    },
  };
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <DashboardCard
          Bordercolor={"border-yellow-500"}
          textColor="text-yellow-500"
          bgColor="bg-yellow-600/20"
          ICON={RiMoneyDollarBoxFill}
          amount={totalSale}
          title="Total Sales"
        />
        <DashboardCard
          Bordercolor={"border-sky-500"}
          textColor="text-sky-500"
          bgColor="bg-sky-600/20"
          ICON={MdForest}
          amount={totalProduct}
          title="Products"
        />
        <DashboardCard
          Bordercolor={"border-green-500"}
          textColor="text-green-500"
          bgColor="bg-green-600/20"
          ICON={MdDiversity3}
          amount={totalSeller}
          title="Sellers"
        />
        <DashboardCard
          Bordercolor={"border-violet-500"}
          textColor="text-violet-500"
          bgColor="bg-violet-600/20"
          ICON={MdGeneratingTokens}
          amount={totalOrder}
          title="Orders"
        />
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-slate-100  p-4 rounded-md">
            <Chart options={state.options} series={state.series} type="bar" height={350} />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-slate-100 p-4 py-7 rounded-md text-slate-600">
            {/* Right part */}
            <Chart
              options={doughnutChartState.options}
              series={doughnutChartState.series}
              type="donut"
              height={370}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4  bg-slate-100 rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-slate-600 pb-3">Recent Orders</h2>
          <Link to={"/admin/dashboard/orders"} className="font-semibold text-sm text-slate-600">
            View All
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="sm:text-sm text-xs text-slate-600 uppercase border-b bg-slate-300">
              <tr>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Order Id
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Price
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Payment Status
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Order Status
                </th>
                <th scope="col" className="py-3 lg:px-4 px-2">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((d, i) => (
                <tr key={i} className="border-b">
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <span>{d.delivery_status}</span>
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <span>{d.payment_status}</span>
                  </td>
                  <td scope="row" className="py-3 lg:px-4 px-2 font-medium whitespace-nowrap">
                    <Link to={`/admin/dashboard/order/details/${d._id}`} className="bg-green-200 px-2 py-1">
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
