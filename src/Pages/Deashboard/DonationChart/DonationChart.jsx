import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const data = [
  {
    name: "Page A",
    amount: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    amount: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    amount: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    amount: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    amount: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    amount: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    amount: 3490,
    // pv: 4300,
    // amt: 2100,
  },
];

const DonationChart = () => {
  const axiosPublic = useAxiosPublic();

  const { data: donationsData = [] } = useQuery({
    queryKey: ["donationsData"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/donations-history");
      return data;
    },
  });
  console.log(donationsData);

  const paiChartData = donationsData.map(data =>{
    return {name:data.petName, amount:data.donationAmount}
  })

  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <p className="md:mt-20 mt-10 mb-5 text-lg md:text-2xl text-[#5F56C6] dark:text-white text-center">Donation Chart</p>
        <ResponsiveContainer>
          <AreaChart
            data={paiChartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#5F56C6"
              fill="#5F56C6"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DonationChart;
