import { Formik, Form, FormikProps, Field } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Button, Input, Label } from "../../../atoms";
import { ITypeClient } from ".";

interface IProps {
  client_id?: string;
}

function CreateClientForm(props: IProps) {
  const { client_id } = props;
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string>("");

  const [formValues, setFormValues] = useState<ITypeClient>({
    mobile_no: "",
    name: "",
    gender: "male",
    dob: new Date(),
    alt_mobile_no: "",
    email: "",
    address: "",
    mother_tongue: "",
    f_name: "",
    m_name: "",
    discontinued: false,
    discontinued_on: new Date(),
    branch: "",
    assessment: [],
    chief_complaints: "",
    diagnosis: "",
    slot_time: new Date(),
    therapy: [],
  });

  const isClientNull = useCallback(() => {
    return (
      client_id === undefined || client_id === null || client_id.length === 0
    );
  }, [client_id]);

  useEffect(() => {
    async function loadData() {
      if (isClientNull()) {
        setLoading(false);
        return;
      }

      try {
        const api = API.ENDPOINTS.FIND_CLIENT(String(client_id));
        const result = await apiService.getApi(api);
        const data = result.data.data;
        setFormValues({
          ...data,
          dob: data.dob.toString(),
          discontinued_on: data.discontinued_on,
          slot_time: data.slot_time,
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [client_id, isClientNull]);

  const formRef: React.MutableRefObject<FormikProps<ITypeClient>> =
    useRef<any>();

  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validate = Yup.object({
    mobile_no: Yup.string()
      .matches(phoneRegExp, "Mobile number is not valid")
      .required("Required"),
    name: Yup.string()
      .max(25, "Must be 25 characters or less")
      .min(3, "3 Characters or more")
      .required("Required"),
    gender: Yup.string().required("Required"),
    dob: Yup.date().max(new Date()).required("Required"),
    alt_mobile_no: Yup.string()
      .matches(phoneRegExp, "Mobile number is not valid")
      .notRequired(),
    email: Yup.string()
      .matches(emailRegExp, "Email address is not valid")
      .required("Required"),
    address: Yup.string()
      .required("Required")
      .max(250, "Must be 250 characters or less")
      .min(5, "5 Characters or more"),
    mother_tongue: Yup.string()
      .required("Required")
      .max(25, "Must be 25 characters or less")
      .min(2, "2 Characters or more"),
    f_name: Yup.string()
      .max(25, "Must be 25 characters or less")
      .min(3, "3 Characters or more")
      .required("Required"),
    m_name: Yup.string()
      .max(25, "Must be 25 characters or less")
      .min(3, "3 Characters or more")
      .required("Required"),
    discontinued: Yup.bool().required("Required"),
    discontinued_on: Yup.date().max(new Date()).notRequired(),
    branch: Yup.string()
      .max(3, "Must be 3 characters or less")
      .required("Required"),
    assessment: Yup.array().required("Required"),
    chief_complaints: Yup.string()
      .max(100, "Must be 250 characters or less")
      .min(5, "5 Characters or more")
      .required("Required"),
    diagnosis: Yup.string()
      .max(100, "Must be 50 characters or less")
      .min(2, "2 Characters or more")
      .required("Required"),
    slot_time: Yup.date().max(new Date()).required("Required"),
    therapy: Yup.array().required("Required"),
  });

  async function handleSubmit(values: ITypeClient, callback: () => void) {
    setError("");
    try {
      const api = isClientNull()
        ? API.ENDPOINTS.CREATE_CLIENT
        : API.ENDPOINTS.EDIT_CLIENT;
      await apiService.postApi(api, values);
      if (isClientNull()) {
        window.alert("The client successfully created.");
        callback();
      } else {
        window.alert("The client successfully updated.");
      }
    } catch (error: any) {
      console.log(error);
      setError("Unknown error occured. Please try again later");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <Formik
        initialValues={formValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, () => {
            if (isClientNull()) {
              resetForm();
            }
          });
        }}
        innerRef={formRef}
        validationSchema={validate}
      >
        <Form className="flex flex-col w-full space-y-4">
          {error && <Label title={error} style={{ color: "#FF0000" }} />}
          <Input name="mobile_no" label="Mobile Number" required />
          <Input name="name" label="Client Name" required />
          <Label
            block
            secondary
            required={true}
            title="Gender"
            medium
            style={{
              fontSize: 11,
            }}
          />
          <div role="group" className="space-x-3" aria-labelledby="radio-group">
            <label>
              <Field type="radio" name="gender" value="male" />
              <span className="pl-2">Male</span>
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              <span className="pl-2">Female</span>
            </label>
            <label>
              <Field type="radio" name="gender" value="other" />
              <span className="pl-2">Other</span>
            </label>
          </div>
          <Input name="dob" label="DOB" required type="date" />
          <Input name="alt_mobile_no" label="Alternate Mobile Number" />
          <Input name="email" label="Email Address" required type="email" />
          <Input name="address" label="Address" required />
          <Input name="mother_tongue" label="Mother Tongue" required />
          <Input name="f_name" label="Father Name" required />
          <Input name="m_name" label="Mother Name" required />
          <label className="space-x-2">
            <Label
              block
              secondary
              required={true}
              title="Discontinued"
              medium
              style={{
                fontSize: 11,
              }}
            />
            <Field type="checkbox" name="discontinued" />
          </label>
          <Input
            name="discontinued_on"
            label="Discontinued On"
            type="datetime-local"
          />
          <Input name="branch" label="Branch" required />
          <Label
            block
            secondary
            required={true}
            title="Assessments"
            medium
            style={{
              fontSize: 11,
            }}
          />
          <div
            role="group"
            className="space-x-3"
            aria-labelledby="checkbox-group"
          >
            <label>
              <Field type="checkbox" name="assessment" value="BT" />
              <span className="pl-2">BT</span>
            </label>
            <label>
              <Field type="checkbox" name="assessment" value="ST" />
              <span className="pl-2">ST</span>
            </label>
            <label>
              <Field type="checkbox" name="assessment" value="OT" />
              <span className="pl-2">OT</span>
            </label>
          </div>
          <Input name="chief_complaints" label="Chief Complaints" required />
          <Input name="diagnosis" label="Diagnosis" required />
          <Input
            name="slot_time"
            label="Slot Time"
            required
            type="datetime-local"
          />
          <Label
            block
            secondary
            required={true}
            title="Therapy"
            medium
            style={{
              fontSize: 11,
            }}
          />
          <div
            role="group"
            className="space-x-3"
            aria-labelledby="checkbox-group"
          >
            <label>
              <Field type="checkbox" name="therapy" value="BT" />
              <span className="pl-2">BT</span>
            </label>
            <label>
              <Field type="checkbox" name="therapy" value="ST" />
              <span className="pl-2">ST</span>
            </label>
            <label>
              <Field type="checkbox" name="therapy" value="OT" />
              <span className="pl-2">OT</span>
            </label>
            <label>
              <Field type="checkbox" name="therapy" value="PT" />
              <span className="pl-2">PT</span>
            </label>
            <label>
              <Field type="checkbox" name="therapy" value="SE" />
              <span className="pl-2">SE</span>
            </label>
          </div>
          <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
            <Button
              onClick={() => {}}
              className="mt-2 py-2 px-12 shadow-lg"
              primary
              shadow
              type="submit"
            >
              {isClientNull() ? "Submit" : "Update"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateClientForm;
