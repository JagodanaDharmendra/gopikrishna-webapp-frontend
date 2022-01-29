import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvide";
import { Button, Input, Label } from "../../atoms";

import { Form, Formik } from "formik";
import * as apiService from "../../api-call";
import { API } from "../../constant/Endpoints";
import { CookieHelper } from "../../libs";
import { useEffect, useState } from "react";

interface MyFormValues {
  userName: string;
  pwd: string;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const initialValues: MyFormValues = {
    userName: "AD01",
    pwd: "12345",
  };
  let from = location.state?.from?.pathname || "/dashboard";

  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin App";
  }, []);

  async function handleSubmit(value: MyFormValues, callback: () => void) {
    console.log(value);
    const api = API.ENDPOINTS.LOGIN;
    try {
      const result = await apiService.postApi(api, {
        userName: value.userName,
        pwd: value.pwd,
      });
      check(result);
    } catch (result) {
      check(result);
    }

    function check(result: any) {
      try {
        const data = result.data;
        console.log(data);
        if (data && data.success && data.data) {
          console.log(data.data.admin);
          CookieHelper.SetCookie("token", data.data.token);
          auth.signin(data.data?.admin?.first_name ?? "Admin", () => {
            callback();
            navigate(from, { replace: true });
          });
        } else {
          callback();
          console.log("Login Failed");
          setError(data.error);
        }
      } catch (error: any) {
        callback();
        console.log("Login Failed");
        setError("Server not responding");
      }
    }
  }

  return (
    <div className="w-screen h-screen">
      <div className="relative flex h-full">
        {/* <img
          src={require("../../assets/background.svg").default}
          alt="img"
          className="absolute top-0 right-0 h-full w-full object-cover"
        /> */}
        <div className="flex h-full w-full min-w-sm z-0">
          <div className="flex-1 my-auto p-3">
            <div className="m-auto flex-1 items-center bg-white mt-25vh shadow-2xl max-w-md p-10 rounded-lg">
              <h2 className="text-center text-2xl font-semibold mb-10">
                Login as Admin
              </h2>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, () => {
                    setSubmitting(false);
                  });
                }}
                validate={(values) => {
                  setError("");
                  const errors: any = {};
                  if (!values.userName) {
                    errors.userName = "User Name required";
                  }
                  if (!values.pwd) {
                    errors.pwd = "Password required";
                  }
                  return errors;
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }: any) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      {error && (
                        <Label title={error} style={{ color: "#FF0000" }} />
                      )}
                      <Input
                        fieldStyle="legacy"
                        label="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                      />
                      <Input
                        fieldStyle="legacy"
                        label="Password"
                        className="mt-6"
                        name="pwd"
                        value={values.pwd}
                        onChange={handleChange}
                      />
                      <Button
                        primary
                        block
                        className="rounded-xl mt-8"
                        onClick={() => {}}
                        disabled={isSubmitting}
                      >
                        Login
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className="flex-none xl:flex-1 justify-items-center" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
