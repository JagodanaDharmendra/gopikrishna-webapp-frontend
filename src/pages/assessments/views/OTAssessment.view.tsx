import { useEffect, useState } from "react";
import {
  ISTAssessment,
  ItemCompletedAssessment,
  ItemDraftAssessment,
  ItemPendingAssessment,
} from "..";

import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Label } from "../../../atoms";

const OTAssessment = () => {
  const [assessments, setAssessments] = useState<Array<ISTAssessment>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const api = API.ENDPOINTS.FIND_ALL_ASSESSMENTS("OT");
      const result = await apiService.getApi(api);
      console.log(result.data);
      const data = result.data.data;
      setAssessments(data);
    } catch (error: any) {
      setAssessments([]);
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

  if (!assessments || assessments.length === 0) {
    return <div>No Assessments found</div>;
  }

  const draftAssessments = assessments.filter((X) => X.draft);
  const pendingAssessments = assessments.filter(
    (X) => !X.draft && !X.email_sent,
  );
  const completedAssessments = assessments.filter(
    (X) => X.email_sent && !X.draft,
  );

  return (
    <>
      <div>OT Assessments</div>
      {error && <Label title={error} style={{ color: "#FF0000" }} />}
      <div>
        <div className="flex m-4 border-t-2">Draft Assessments</div>
        <div>
          {draftAssessments?.map((value, index) => {
            return (
              <div key={`${value.client_id}_${index}`}>
                <ItemDraftAssessment {...value} />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex m-4 border-t-2">Pending Assessments</div>
        <div>
          {pendingAssessments?.map((value, index) => {
            return (
              <div key={`${value.client_id}_${index}`}>
                <ItemPendingAssessment {...value} />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex m-4 border-t-2">Completed Assessments</div>
        <div>
          {completedAssessments?.map((value, index) => {
            return (
              <div key={`${value.client_id}_${index}`}>
                <ItemCompletedAssessment {...value} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OTAssessment;
