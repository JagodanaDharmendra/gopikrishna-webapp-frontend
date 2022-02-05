import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { IOTAssessment } from "..";
import { Button, Input } from "../../../atoms";

export interface IProps {
  initialValues: IOTAssessment & any;
  onSubmit?: () => void;
  onSave?: () => void;
  onChange?: (key: string, value: string) => void;
}

const STForm = (props: IProps) => {
  const formRef: React.MutableRefObject<FormikProps<IOTAssessment & any>> =
    useRef<any>();
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    family_history: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    recommendations: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });

  function handleChange(e: any) {
    props.onChange?.(e.target.name, e.target.value);
  }

  const handleSubmit = async (values: IOTAssessment & any) => {};

  useEffect(() => {
    const { name, family_history, recommendations } = props.initialValues;
    console.log();
    formRef.current.setValues({
      name: name ?? "",
      family_history: family_history ?? "",
      recommendations: recommendations ?? "",
    });
  }, [props.initialValues]);

  return (
    <>
      <Formik
        initialValues={props.initialValues}
        onSubmit={handleSubmit}
        innerRef={formRef}
        validationSchema={validate}
      >
        <Form>
          <Input name="name" label="Name" onChange={handleChange} required />
          <Input
            name="family_history"
            label="Family History"
            onChange={handleChange}
            required
          />
          <Input
            name="recommendations"
            label="Recommendations"
            onChange={handleChange}
            required
          />
          <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
            <Button
              onClick={() => {
                console.log(formRef.current.values);
                props.onSave?.();
              }}
              className="mt-2 py-2 px-12 shadow-lg"
              children="Save"
              primary
              shadow
            />

            <Button
              onClick={() => {
                console.log(formRef.current.values);
                props.onSubmit?.();
              }}
              className="mt-2 py-2 px-12 shadow-lg"
              children="Submit"
              primary
              shadow
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default STForm;
