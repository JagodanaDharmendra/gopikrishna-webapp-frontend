import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import * as apiService from "../../api-call";
import { Button, Input, Label, Select } from "../../atoms";
import { API } from "../../constant/Endpoints";
import { Search } from "../../molecules";
import { ITypeUser, UserItem } from "./components";

function View() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<ITypeUser>>([]);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const formValues: ITypeUser = {
    userName: "",
    pwd: "",
    department: "BT",
  };

  const formRef: React.MutableRefObject<FormikProps<ITypeUser>> = useRef<any>();
  const validate = Yup.object({
    userName: Yup.string()
      .max(15, "Must be 10 characters or less")
      .min(4, "4 characters or more")
      .notOneOf(
        users.map((value) => {
          return value.userName;
        }),
      )
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
      window.alert("The user was successfully created.");
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

  async function deleteUser(values: { userName: string }) {
    try {
      let isConfirm: boolean = window.confirm(
        `Are you sure you want to remove this user(${values.userName})?`,
      );
      if (isConfirm) {
        const api = API.ENDPOINTS.DELETE_USER;
        await apiService.postApi(api, values);
        setUsers(
          users.filter((x) => {
            return x.userName !== values.userName;
          }),
        );
        window.alert("The user was successfully removed.");
      } else {
        window.alert("Request to remove a user was cancelled.");
      }
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

  const userSearchResult =
    users &&
    users.filter((value: ITypeUser) => {
      if (!searchQuery || searchQuery.length <= 0) {
        return true;
      }
      if (
        searchQuery &&
        searchQuery.length > 0 &&
        (value.userName.includes(searchQuery) ||
          value.department.includes(searchQuery))
      ) {
        return true;
      }
      return false;
    });

  return (
    <div className="px-8">
      <div>
        <Formik
          initialValues={{ ...formValues }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, () => {
              resetForm();
            });
          }}
          innerRef={formRef}
          validationSchema={validate}
        >
          <Form>
            {error && <Label title={error} style={{ color: "#FF0000" }} />}
            <Input
              name="userName"
              label="User Name"
              required
              placeholder="Enter User Name (BT01)"
            />
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
      <ul className="flex flex-col mt-4">
        {!userSearchResult ||
          (userSearchResult.length === 0 && (
            <div className="w-full justify-center items-center text-center">
              <h1>No users found</h1>
            </div>
          ))}
        {userSearchResult
          ?.filter((value: ITypeUser) => {
            if (!searchQuery || searchQuery.length === 0) {
              return value;
            }
            if (
              value.userName.includes(searchQuery) ||
              value.department.includes(searchQuery)
            ) {
              return value;
            } else {
              return null;
            }
          })
          .map((value: ITypeUser, index: number) => {
            return (
              <UserItem index={index} value={value} onClick={deleteUser} />
            );
          })}
      </ul>
    </div>
  );
}

export default View;
