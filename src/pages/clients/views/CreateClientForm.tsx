import { Formik, Form, FormikProps, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Button, Input, Label } from "../../../atoms";

interface ITypeClient {
  name: string;
  mobile_no: string;
  email: string;
  assessment: Array<string>;
}

interface IProps {
  client_id?: string;
}

const View = (props: IProps) => {
  const { client_id } = props;
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string>("");

  const [formValues, setFormValues] = useState<ITypeClient>({
    name: "",
    mobile_no: "",
    email: "",
    assessment: [],
  });

  useEffect(() => {
    async function loadData() {
      if (client_id === undefined) {
        // setError("Client id not found");
        setLoading(false);
        return;
      }

      try {
        const api = API.ENDPOINTS.FIND_CLIENT(client_id);
        const result = await apiService.getApi(api);
        const data = result.data.data;
        console.log(data);
        setFormValues({ ...data });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [client_id]);

  const formRef: React.MutableRefObject<FormikProps<ITypeClient>> =
    useRef<any>();
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(3, "3 characters or more")
      .required("Required"),
    mobile_no: Yup.string()
      .max(10, "Must be 10 characters")
      .min(10, "Must be 10 characters")
      .required("Required"),
    email: Yup.string().required("Required"),
    assessment: Yup.array().required("Required"),
  });

  async function handleSubmit(values: ITypeClient, callback: () => void) {
    setError("");
    try {
      const api = client_id
        ? API.ENDPOINTS.EDIT_CLIENT
        : API.ENDPOINTS.CREATE_CLIENT;
      await apiService.postApi(api, values);
      console.log("client update done...");
    } catch (error: any) {
      console.log(error);
      setError("Unknown error occured. Please try again later");
    } finally {
      callback();
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <div>
        <Formik
          initialValues={formValues}
          onSubmit={(values, {}) => {
            handleSubmit(values, () => {});
          }}
          innerRef={formRef}
          validationSchema={validate}
        >
          <Form>
            {error && <Label title={error} style={{ color: "#FF0000" }} />}
            <Input name="name" label="User Name" required />
            <Input name="mobile_no" label="Mobile Number" required />
            <Input name="email" label="Email Address" required />
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
            <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
              <Button
                onClick={() => {}}
                className="mt-2 py-2 px-12 shadow-lg"
                primary
                shadow
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default View;
