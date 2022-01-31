import React from "react";
import { Pie } from "react-chartjs-2";

interface IProps {
  bt?: number;
  st?: number;
  ot?: number;
  width?: number;
  height?: number;
  className?: string;
}

const PieChart: React.FC<IProps> = (props: IProps & any) => {
  const {
    bt = 35,
    st = 45,
    ot = 4,
    width = 361,
    height = 340,
    className = "",
  } = props;

  const data = {
    labels: ["BT", "ST", "OT"],
    datasets: [
      {
        data: [bt, st, ot],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options: any = {
    scales: {},
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        backgroundColor: "#5a6e7f",
      },
    },
  };

  return (
    <div className={className}>
      <Pie data={data} height={height} width={width} options={options} />
    </div>
  );
};

export default PieChart;
