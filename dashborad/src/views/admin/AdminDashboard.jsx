import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { MdAttachMoney, MdLocalMall, MdShoppingCart } from "react-icons/md";

const AdminDashboard = () => {
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
        foreColor: "#d0d2d6",
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
        foreColor: "#d0d2d6",
      },
    },
  };
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {[1, 2, 3, 4].map((item, i) => (
          <div className="bg-slate-50 shadow-md border-l-4 border-green-500 rounded-md p-4 flex justify-between items-center text-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-600">$6566</h2>
              <span className="text-md font-medium text-gray-600">Total Sales</span>
            </div>
            <div className="bg-[#28c76f1f] rounded-full p-3 ">
              <MdAttachMoney className="text-[#28c76f] text-4xl" />
            </div>
          </div>
        ))}
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
          <Link className="font-semibold text-sm text-slate-600">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-sm text-slate-600 uppercase border-b bg-slate-300">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    #455fdf54545
                  </td>
                  <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    $656
                  </td>
                  <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>pending</span>
                  </td>
                  <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>pending</span>
                  </td>
                  <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link>view</Link>
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
