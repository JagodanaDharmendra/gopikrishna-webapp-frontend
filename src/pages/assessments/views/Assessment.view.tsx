import { useEffect, useState } from "react";
import {
  ItemCompletedAssessment,
  ItemDraftAssessment,
  ItemPendingAssessment,
} from "..";

import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Label } from "../../../atoms";

interface IProps {
  assessmentType: "BT" | "ST" | "OT";
}

const Assessment = (props: IProps) => {
  const [assessments, setAssessments] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const api = API.ENDPOINTS.FIND_ALL_ASSESSMENTS(props.assessmentType);
      const result = await apiService.getApi(api);
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

  const draftAssessments = assessments.filter((X) => X.draft && !X.email_sent);
  const pendingAssessments = assessments.filter(
    (X) => !X.draft && !X.email_sent,
  );
  const completedAssessments = assessments.filter(
    (X) => X.email_sent && !X.draft,
  );

  function PanelTitle({ title }: any) {
    return (
      <>
        <div className=" bg-gray rounded-t">
          <div className="flex m-4">{title}</div>
        </div>
      </>
    );
  }

  function PanelDescription({ dataList, Children }: any) {
    return (
      <>
        {(!dataList || dataList.length == 0) && (
          <div className="flex h-12 content-center justify-center items-center">
            <div>No data found</div>
          </div>
        )}
        {dataList?.map((value: any, index: number) => {
          return (
            <div key={`${value.client_id}_${value.version}_${index}`}>
              <Children {...value} />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="flex w-full flex-col">
      {error && <Label title={error} style={{ color: "#FF0000" }} />}
      <>
        <PanelTitle title="Draft Assessments" />
        <PanelDescription
          dataList={draftAssessments}
          Children={ItemDraftAssessment}
        />
      </>
      <>
        <PanelTitle title="Pending Assessments" />
        <PanelDescription
          dataList={pendingAssessments}
          Children={ItemPendingAssessment}
        />
      </>
      <>
        <PanelTitle title="Completed Assessments" />
        <PanelDescription
          dataList={completedAssessments}
          Children={ItemCompletedAssessment}
        />
      </>
    </div>
  );
};

export default Assessment;
