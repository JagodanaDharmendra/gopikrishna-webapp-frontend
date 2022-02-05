// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBTAssessment, ISTAssessment, IOTAssessment } from ".";
//
import * as apiService from "../../api-call";
import { Label } from "../../atoms";
import { API } from "../../constant/Endpoints";
import { BTForm, STForm, OTForm } from "./forms";

const AssessmentsEdit: React.FC<any> = () => {
  let params = useParams();
  const client_id = params.client_id;
  const assessmentType: string = params.assessmentType ?? "BT";
  const version: number = Number(params.version) ?? 0;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [clientAssessments, setClientAssessments] = useState<Array<string>>([]);

  const [BTFormValues, setBTFormValues] = useState<IBTAssessment>({
    therapist: "",
    assessment_date: new Date(),
    prenatal_history: "",
    family_history: "",
    development_history: "",
    school_history: "",
    tests_administered: "",
    behavior_observation: "",
    test_results: "",
    impression: "",
    recommendations: "",
  });

  const [STFormValues, setSTFormValues] = useState<ISTAssessment & any>({
    name: "",
    family_history: "",
    recommendations: "",
  });

  const [OTFormValues, setOTFormValues] = useState<IOTAssessment & any>({
    name: "",
    family_history: "",
    recommendations: "",
  });

  const _updateForms = useCallback(
    (data: Array<any>) => {
      const updateBTForm = (item: Array<any>) => {
        const data = item && item.length !== 0 ? item[0] : undefined;
        if (clientAssessments.includes("BT") && data) {
          // console.log("updateBTForm");
          setBTFormValues({ ...data });
        }
      };

      const updateSTForm = (item: Array<any>) => {
        const data = item && item.length !== 0 ? item[0] : undefined;
        if (clientAssessments.includes("ST") && data) {
          // console.log("updateSTForm");
          setSTFormValues({ ...data });
        }
      };

      const updateOTForm = (item: Array<any>) => {
        const data = item && item.length !== 0 ? item[0] : undefined;
        if (clientAssessments.includes("OT") && data) {
          // console.log("updateOTForm");
          setOTFormValues({ ...data });
        }
      };

      updateBTForm(data.filter((X: any) => X.assessmentType === "BT"));
      updateSTForm(data.filter((X: any) => X.assessmentType === "ST"));
      updateOTForm(data.filter((X: any) => X.assessmentType === "OT"));
    },
    [clientAssessments],
  );

  useEffect(() => {
    document.title = "AssessmentsEdit - Admin App";
  }, []);

  useEffect(() => {
    async function loadData() {
      if (client_id === undefined) {
        setError("Client id not found");
        return;
      }

      try {
        const api = API.ENDPOINTS.FIND_CLIENT(client_id);
        const result = await apiService.getApi(api);
        const data = result.data.data;
        // console.log(data);
        setClientAssessments([...data.assessment]);
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [client_id]);

  useEffect(() => {
    async function loadData() {
      if (client_id === undefined) {
        setError("Client id not found");
        return;
      }
      try {
        const api = API.ENDPOINTS.FIND_ASSESSMENTS_FOR_CLIENT(
          client_id,
          assessmentType,
          version,
        );
        const result = await apiService.getApi(api);
        // console.log(result.data.data);
        const data: Array<any> = result.data.data;
        console.log(data);
        _updateForms(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientAssessments, client_id, _updateForms, version, assessmentType]);

  const submitForm = async (values: any) => {
    // const id = toast.loading("Please wait...");
    try {
      const api = API.ENDPOINTS.EDIT_ASSESSMENT;
      values = { ...values, client_id, version };
      await apiService.postApi(api, values);
      window.alert("The assessment saved successfully.");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message || error);
    }
  };

  const submitBTForm = () => {
    console.log("Submitted BT Form");
    submitForm({
      assessmentType: "BT",
      ...BTFormValues,
      draft: false,
    });
  };

  const saveBTForm = () => {
    console.log("Saved BT Form");
    submitForm({
      assessmentType: "BT",
      ...BTFormValues,
      draft: true,
    });
  };

  const submitSTForm = () => {
    console.log("Submitted ST Form");
    submitForm({
      assessmentType: "ST",
      ...STFormValues,
      draft: false,
    });
  };

  const saveSTForm = () => {
    console.log("Saved ST Form");
    submitForm({
      assessmentType: "ST",
      ...STFormValues,
      draft: true,
    });
  };

  const submitOTForm = () => {
    console.log("Submitted OT Form");
    submitForm({
      ...OTFormValues,
      assessmentType: "OT",
      ...OTFormValues,
      draft: false,
    });
  };

  const saveOTForm = () => {
    console.log("Saved OT Form");
    submitForm({
      assessmentType: "OT",
      ...OTFormValues,
      draft: true,
    });
  };

  if (loading) {
    return (
      <div className="flex w-full h-96 justify-center text-center content-center items-center">
        <h1 className="font-bold uppercase text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      {error && <Label title={error} style={{ color: "#FF0000" }} />}
      <div className="flex flex-col">
        {assessmentType === "BT" && (
          <>
            <Title title="BT Assessment" />
            {!clientAssessments?.includes("BT") && <NotEligible />}
            {clientAssessments?.includes("BT") && (
              <BTForm
                initialValues={BTFormValues}
                onChange={(key: string, value: string) => {
                  setBTFormValues({ ...BTFormValues, [key]: value });
                }}
                onSubmit={() => {
                  submitBTForm();
                }}
                onSave={() => {
                  saveBTForm();
                }}
              />
            )}
          </>
        )}
        {assessmentType === "ST" && (
          <>
            <Title title="ST Assessment" />
            {!clientAssessments?.includes("ST") && <NotEligible />}
            {clientAssessments?.includes("ST") && (
              <STForm
                initialValues={STFormValues}
                onChange={(key: string, value: string) => {
                  setSTFormValues({ ...STFormValues, [key]: value });
                }}
                onSubmit={() => {
                  submitSTForm();
                }}
                onSave={() => {
                  saveSTForm();
                }}
              />
            )}
          </>
        )}
        {assessmentType === "OT" && (
          <>
            <Title title="OT Assessment" />
            {!clientAssessments?.includes("OT") && <NotEligible />}
            {clientAssessments?.includes("OT") && (
              <OTForm
                initialValues={OTFormValues}
                onChange={(key: string, value: string) => {
                  setOTFormValues({ ...OTFormValues, [key]: value });
                }}
                onSubmit={() => {
                  submitOTForm();
                }}
                onSave={() => {
                  saveOTForm();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

function Title({ title }: any) {
  return (
    <h1 className="flex w-full justify-center text-center font-bold text-primary uppercase text-xl">
      {title}
    </h1>
  );
}

function NotEligible() {
  return (
    <div className="flex w-full h-96 justify-center text-center content-center items-center">
      <h1 className="font-bold text-orange uppercase text-xl">
        Not eligible for this category
      </h1>
    </div>
  );
}

export default AssessmentsEdit;
