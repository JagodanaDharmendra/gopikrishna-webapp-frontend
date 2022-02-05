import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ActionButtons } from ".";
import { IOTAssessment } from "..";
import { Input } from "../../../atoms";

export interface IProps {
  initialValues: IOTAssessment & any;
  onSubmit?: () => void;
  onSave?: () => void;
  onSendMail: () => void;
  onViewAsPDF: () => void;
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

  const IsCompleted = props.initialValues.email_sent;
  const IsDraft = props.initialValues.draft;
  const IsPending = !IsDraft && !IsCompleted;
  const disabled = !IsDraft;

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

          <ActionButtons
            IsDraft={IsDraft}
            IsPending={IsPending}
            IsCompleted={IsCompleted}
            onSendMail={props.onSendMail}
            onViewAsPDF={props.onViewAsPDF}
            onSubmit={props.onSubmit}
            onSave={props.onSave}
          />
        </Form>
      </Formik>
    </>
  );
};

export default STForm;
