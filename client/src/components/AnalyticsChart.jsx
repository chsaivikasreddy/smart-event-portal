import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsChart({ stats }) {
  const data = {
    labels: [
      "Users",
      "Events",
      "Registrations",
    ],
    datasets: [
      {
        label: "Portal Statistics",
        data: [
          stats.users,
          stats.events,
          stats.registrations,
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h2 className="text-2xl font-bold mb-4">
        Analytics Overview
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default AnalyticsChart;