import React, { useEffect, useState } from "react";
import * as apiService from "../../api-call";
import { Label } from "../../atoms";
import { API } from "../../constant/Endpoints";
import { DashboardReaders } from "../../helpers";
import { PieChart } from "../../molecules";

const Dashboard: React.FC<any> = () => {
  const [statistics, setStatistics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Dashboard - Admin App";
  }, []);

  async function loadData() {
    try {
      const api = API.ENDPOINTS.FIND_ALL_ASSESSMENTS("");
      const result = await apiService.getApi(api);
      console.log(result.data);
      const data: Array<any> = result.data.data;
      setStatistics({
        bt: data.filter(
          (X) => X.assessmentType === "BT" && !X.email_sent && !X.draft,
        ).length,
        st: data.filter(
          (X) => X.assessmentType === "ST" && !X.email_sent && !X.draft,
        ).length,
        ot: data.filter(
          (X) => X.assessmentType === "OT" && !X.email_sent && !X.draft,
        ).length,
      });
    } catch (error: any) {
      setStatistics({
        bt: 0,
        st: 0,
        ot: 0,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-6 mt-4 float-auto">
        <div className="flex">
          <h1>Pending Assessments</h1>
        </div>
        {error && <Label title={error} style={{ color: "#FF0000" }} />}
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
