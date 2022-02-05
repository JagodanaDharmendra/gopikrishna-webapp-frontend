import { useEffect, useState } from "react";
import {
  ItemCompletedAssessment,
  ItemDraftAssessment,
  ItemPendingAssessment,
} from "..";

import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Label } from "../../../atoms";
import { Search } from "../../../molecules";

interface IProps {
  assessmentType: "BT" | "ST" | "OT";
}

const Assessment = (props: IProps) => {
  const [assessments, setAssessments] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredAssessments =
    assessments &&
    assessments.filter((value: any) => {
      if (!searchQuery || searchQuery.length <= 0) {
        return true;
      }
      if (
        searchQuery &&
        searchQuery.length > 0 &&
        (value.therapist.includes(searchQuery) ||
          value.client_id === searchQuery ||
          value.version === parseInt(searchQuery) ||
          value.modified_by === searchQuery)
      ) {
        return true;
      }
      return false;
    });

  const draftAssessments = filteredAssessments.filter(
    (X) => X.draft && !X.email_sent,
  );
  const pendingAssessments = filteredAssessments.filter(
    (X) => !X.draft && !X.email_sent,
  );
  const completedAssessments = filteredAssessments.filter(
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
      <div className="flex my-3">
        <Search
          onSearch={(query) => {
            setSearchQuery(query);
          }}
          onClear={() => {
            setSearchQuery("");
          }}
        />
      </div>

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
