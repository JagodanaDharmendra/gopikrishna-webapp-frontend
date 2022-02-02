import React, { useEffect, useRef, useState } from "react";
import { API } from "../../constant/Endpoints";
import * as apiService from "../../api-call";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Button, Input, Label, Select } from "../../atoms";

interface ITypeUser {
  userName: string;
  pwd?: string;
  department: "BT" | "OT" | "ST" | "PT" | "SE" | "FO";
}

function View() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<ITypeUser>>([]);
  const [error, setError] = useState<string>("");

  const formValues: ITypeUser = {
    userName: "BT01",
    pwd: "",
    department: "BT",
  };

  const formRef: React.MutableRefObject<FormikProps<ITypeUser>> = useRef<any>();
  const validate = Yup.object({
    userName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(4, "4 characters or more")
      .required("Required"),
    pwd: Yup.string()
      .max(10, "Must be 10 characters or less")
      .min(5, "5 characters or more")
      .required("Required"),
    department: Yup.string().required("Required"),
  });

  async function handleSubmit(values: ITypeUser, callback: () => void) {
    setError("");
    try {
      const api = API.ENDPOINTS.CREATE_USER;
      await apiService.postApi(api, values);
      loadData();
    } catch (error: any) {
      console.log(error);
      setError("Unknown error occured. Please try again later");
    } finally {
      callback();
    }
  }

  useEffect(() => {
    const { userName, pwd, department } = formValues;
    formRef.current.setValues({
      userName: userName ?? "",
      pwd: pwd ?? "",
      department: department ?? "",
    });
    // }, [formValues]);
  });

  async function loadData() {
    const api = API.ENDPOINTS.FIND_ALL_USER;
    try {
      const result = await apiService.getApi(api);
      const data = result.data.data;
      setUsers(
        data.filter((X: any) => {
          return X.department !== "AD";
        }),
      );
    } catch (error: any) {
      setUsers([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(values: any) {
    try {
      const api = API.ENDPOINTS.DELETE_USER;
      await apiService.postApi(api, values);
      setUsers(
        users.filter((x) => {
          return x.userName !== values.userName;
        }),
      );
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-12">
      <div className="px-6 mt-4 float-auto">Users</div>
      <div>
        <Formik
          initialValues={{ ...formValues }}
          onSubmit={(values) => {
            handleSubmit(values, () => {});
          }}
          innerRef={formRef}
          validationSchema={validate}
        >
          <Form>
            {error && <Label title={error} style={{ color: "#FF0000" }} />}
            <Input name="userName" label="User Name" required />
            <Input name="pwd" label="Password" required />
            <Select
              label="Department"
              labelClassName="mb-2"
              required
              defaultOptions={["BT", "OT", "ST", "PT", "SE", "FO"]}
              onSelectionChange={(value: string) => {
                formRef.current.setFieldValue("department", value);
              }}
            />
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
      <ul className="flex flex-col mt-4">
        {!users ||
          (users.length === 0 && (
            <div className="w-full justify-center items-center text-center">
              <h1>No data found for Users</h1>
            </div>
          ))}
        {users?.map((value: ITypeUser, index: number) => {
          return (
            <li
              key={`${index}_${value.department}`}
              className="rounded shadow-lg block m-3"
            >
              <div className="px-6 pt-4 pb-2 grid grid-cols-2 justify-between">
                <div className="">
                  <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Name: {value.userName}
                  </div>
                  <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Department: {value.department}
                  </div>
                </div>
                <div className="flex justify-end items-center content-center">
                  <Button
                    secondary
                    onClick={() => {
                      deleteUser({ userName: value.userName });
                    }}
                  >
                    <Label title="Delete" className=" text-white" />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default View;
