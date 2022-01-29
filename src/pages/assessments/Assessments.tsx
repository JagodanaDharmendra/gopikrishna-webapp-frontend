import React, { useState, useEffect, useRef } from "react";
import { Button, Label } from "../../atoms";
import { Tab } from "@headlessui/react";
import {
  BTForm,
  STForm,
  OTForm,
  IBTFormValues,
  ISTFormValues,
  IOTFormValues,
} from "./forms";
import { API } from "../../constant/Endpoints";
import { postApi } from "../../api-call";

enum ITypeAssessment {
  BT,
  ST,
  OT,
}

interface IProps {
  next?(): void;
}

interface Values {
  first_name: string;
  last_name: string;
  languages: string;
  city_postal_code: string;
  email?: string;
  state: string;
}

const Assessments: React.FC<any> = () => {
  const [typeAssessment, setTypeAssessment] = useState(ITypeAssessment.BT);

  const [BTFormValues, setBTFormValues] = useState<IBTFormValues & any>({
    name: "",
    family_history: "",
    recommendations: "",
  });

  const submitForm = async (values: any) => {
    // const id = toast.loading("Please wait...");
    try {
      const api = API.ENDPOINTS.CREATE_ASSESSMENT;
      // if (!value.email) delete value.email;
      await postApi(api, values);
      // dispatch(addInfo(value));
      // toast.dismiss(id);
      // navigate("doc", { replace: true });
      // toast.success("Profile updated successfully");
    } catch (error: any) {
      // toast.dismiss(id);
      // toast.error(error.data.error);
    }
  };

  const submitBTForm = () => {
    console.log("Submitted BT Form");
    submitForm({
      ...BTFormValues,
      draft: false,
    });
  };

  const saveBTForm = () => {
    console.log("Saved BT Form");
    submitForm({
      ...BTFormValues,
      draft: true,
    });
  };

  useEffect(() => {
    document.title = "Assessments - Admin App";
  }, []);

  return (
    <>
      <div className="px-6 mt-4 float-auto">
        <div className="flex">
          <h1>Assessments</h1>
        </div>
        <div>
          <Button
            primary
            className=""
            onClick={() => {
              console.log("Create new Assessments");
            }}
          >
            <Label title="+ NEW" />
          </Button>
        </div>
        <Tab.Group
          onChange={(index) => {
            console.log("Changed selected tab to:", index);
            setTypeAssessment(
              index == 0
                ? ITypeAssessment.BT
                : index == 1
                ? ITypeAssessment.ST
                : ITypeAssessment.OT
            );
          }}
        >
          <Tab.List>
            <Tab>BT Assessments</Tab>
            <Tab>ST Assessments</Tab>
            <Tab>OT Assessments</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
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
            </Tab.Panel>
            <Tab.Panel>
              <STForm />
            </Tab.Panel>
            <Tab.Panel>
              <OTForm />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Assessments;
