import React, { useEffect, useState } from "react";
import * as apiService from "../../api-call";
import { API } from "../../constant/Endpoints";
import { DashboardReaders } from "../../helpers";
import { PieChart } from "../../molecules";

const Dashboard: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    document.title = "Dashboard - Admin App";
  }, []);

  useEffect(() => {
    async function loadData() {
      const api = API.ENDPOINTS.FIND_ALL_CLIENT;
      try {
        const result = await apiService.getApi(api);
        const data = result.data;
        console.log(data);
        setStatistics(data.data);
      } catch (error) {
        setStatistics(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="px-6 mt-4 float-auto">
        <div className="flex">
          <h1>Pending Assessments</h1>
        </div>
        <div className="flex col-span-1 lg:col-span-3 xl:col-span-7 justify-center my-auto">
          <PieChart
            className="w-10/12 xl:w-96 lg:mr-12 h-2/4 lg:h-4/5 p-4"
            bt={DashboardReaders.GetChartValue(statistics, "bt")}
            st={DashboardReaders.GetChartValue(statistics, "st")}
            ot={DashboardReaders.GetChartValue(statistics, "ot")}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
