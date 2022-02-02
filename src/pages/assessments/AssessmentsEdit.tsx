// eslint-disable-next-line react-hooks/exhaustive-deps
import { Tab } from "@headlessui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//
import * as apiService from "../../api-call";
import { Label } from "../../atoms";
import { API } from "../../constant/Endpoints";
import {
  BTForm,
  STForm,
  OTForm,
  IBTFormValues,
  IOTFormValues,
  ISTFormValues,
} from "./forms";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  {
    tabTitle: "BT Assessment",
  },
  {
    tabTitle: "ST Assessment",
  },
  {
    tabTitle: "OT Assessment",
  },
];

const AssessmentsEdit: React.FC<any> = () => {
  let params = useParams();
  const client_id = params.client_id;
  const assessmentType = params.assessmentType ?? "BT";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [clientAssessments, setClientAssessments] = useState<Array<string>>([]);

  const [BTFormValues, setBTFormValues] = useState<IBTFormValues & any>({
    name: "",
    family_history: "",
    recommendations: "",
  });

  const [STFormValues, setSTFormValues] = useState<ISTFormValues & any>({
    name: "",
    family_history: "",
    recommendations: "",
  });

  const [OTFormValues, setOTFormValues] = useState<IOTFormValues & any>({
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

  // function updateForms(data: Array<any>) {
  //   updateBTForm(data.filter((X: any) => X.assessmentType === "BT"));
  //   updateSTForm(data.filter((X: any) => X.assessmentType === "ST"));
  //   updateOTForm(data.filter((X: any) => X.assessmentType === "OT"));
  // }

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
        const api = API.ENDPOINTS.FIND_ALL_ASSESSMENTS_FOR_CLIENT(client_id);
        const result = await apiService.getApi(api);
        // console.log(result.data.data);
        const data: Array<any> = result.data.data;

        _updateForms(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientAssessments, client_id, _updateForms]);

  const submitForm = async (values: any) => {
    // const id = toast.loading("Please wait...");
    try {
      const api = API.ENDPOINTS.CREATE_ASSESSMENT;
      values = { ...values, client_id: client_id };
      await apiService.postApi(api, values);
    } catch (error: any) {}
  };

  const submitBTForm = () => {
    console.log("Submitted BT Form");
    submitForm({
      assessmentType: "BT",
      values: { ...BTFormValues, draft: false },
    });
  };

  const saveBTForm = () => {
    console.log("Saved BT Form");
    submitForm({
      assessmentType: "BT",
      values: { ...BTFormValues, draft: true },
    });
  };

  const submitSTForm = () => {
    console.log("Submitted ST Form");
    submitForm({
      assessmentType: "ST",
      values: { ...STFormValues, draft: false },
    });
  };

  const saveSTForm = () => {
    console.log("Saved ST Form");
    submitForm({
      assessmentType: "ST",
      values: { ...STFormValues, draft: true },
    });
  };

  const submitOTForm = () => {
    console.log("Submitted OT Form");
    submitForm({
      ...OTFormValues,
      assessmentType: "OT",
      values: { ...OTFormValues, draft: false },
    });
  };

  const saveOTForm = () => {
    console.log("Saved OT Form");
    submitForm({
      assessmentType: "OT",
      values: { ...OTFormValues, draft: true },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {error && <Label title={error} style={{ color: "#FF0000" }} />}
      <div className="flex flex-col">
        <Tab.Group
          defaultIndex={
            assessmentType === "OT" ? 2 : assessmentType === "ST" ? 1 : 0
          }
          onChange={(index) => {
            // console.log("Changed selected tab to:", index);
          }}
        >
          <Tab.List className="flex space-x-3 w-full justify-around  p-1 bg-gray rounded-xl">
            {tabs.map((value, index) => {
              return (
                <Tab
                  key={`${index}-${value.tabTitle}`}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium  rounded-lg",
                      selected ? "bg-white shadow text-primary" : "text-white",
                    )
                  }
                >
                  {value.tabTitle}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="flex w-full mt-4">
            <Tab.Panel>
              {!clientAssessments?.includes("BT") && <h1>Not eligible</h1>}
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
            </Tab.Panel>
            <Tab.Panel>
              {!clientAssessments?.includes("ST") && <h1>Not eligible</h1>}
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
            </Tab.Panel>
            <Tab.Panel>
              {!clientAssessments?.includes("OT") && <h1>Not eligible</h1>}
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
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AssessmentsEdit;
