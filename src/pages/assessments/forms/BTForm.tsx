import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ActionButtons, BackButton } from ".";
import { IBTAssessment } from "..";
import { Input } from "../../../atoms";

export interface IProps {
  initialValues: IBTAssessment;
  onSubmit: () => void;
  onSave: () => void;
  onSendMail: () => void;
  onViewAsPDF: () => void;
  onChange: (key: string, value: string) => void;
}

const BTForm = (props: IProps) => {
  const formRef: React.MutableRefObject<FormikProps<IBTAssessment>> =
    useRef<any>();

  const validate = Yup.object({
    therapist: Yup.string().required("Required"),
    assessment_date: Yup.date().max(new Date()).required("Required"),
    prenatal_history: Yup.string().required("Required"),
    family_history: Yup.string().required("Required"),
    development_history: Yup.string().required("Required"),
    school_history: Yup.string().required("Required"),
    tests_administered: Yup.string().required("Required"),
    behavior_observation: Yup.string().required("Required"),
    test_results: Yup.string().required("Required"),
    impression: Yup.string().required("Required"),
    recommendations: Yup.string().required("Required"),
  });

  function handleChange(e: any) {
    props.onChange(e.target.name, e.target.value);
  }

  useEffect(() => {
    const {
      therapist,
      assessment_date,
      prenatal_history,
      family_history,
      development_history,
      school_history,
      tests_administered,
      behavior_observation,
      test_results,
      impression,
      recommendations,
    } = props.initialValues;

    formRef.current.setValues({
      therapist: therapist ?? "",
      assessment_date: assessment_date ?? new Date(),
      prenatal_history: prenatal_history ?? "",
      family_history: family_history ?? "",
      development_history: development_history ?? "",
      school_history: school_history ?? "",
      tests_administered: tests_administered ?? "",
      behavior_observation: behavior_observation ?? "",
      test_results: test_results ?? "",
      impression: impression ?? "",
      recommendations: recommendations ?? "",
    });
  }, [props.initialValues]);

  const IsCompleted = props.initialValues.email_sent;
  const IsDraft = props.initialValues.draft && !IsCompleted;
  const IsPending = !IsDraft && !IsCompleted;
  const disabled = !IsDraft;

  return (
    <>
      <BackButton />
      <Formik
        initialValues={props.initialValues}
        onSubmit={() => {}}
        innerRef={formRef}
        validationSchema={validate}
      >
        <Form className="space-y-2 mt-3">
          <Input
            name="assessmentType"
            label="AssessmentType"
            value="BT"
            disabled
          />
          <Input
            name="client_id"
            label="Client Id"
            value={props.initialValues.client_id}
            disabled
          />
          <Input
            name="version"
            label="Version"
            value={props.initialValues.version}
            disabled
          />
          <Input
            name="therapist"
            label="Therapist"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="assessment_date"
            label="Assessment Date"
            onChange={handleChange}
            required
            type="date"
            disabled={disabled}
          />
          <Input
            name="prenatal_history"
            label="Prenatal History"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="family_history"
            label="Family History"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="development_history"
            label="Development History"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="school_history"
            label="School History"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="tests_administered"
            label="Tests Administered"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="behavior_observation"
            label="Behavior Observation"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="test_results"
            label="Test Results"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="impression"
            label="Impression"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="recommendations"
            label="Recommendations"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <ActionButtons
            IsDraft={IsDraft}
            IsPending={IsPending}
            IsCompleted={IsCompleted}
            onSendMail={props.onSendMail}
            onViewAsPDF={props.onViewAsPDF}
            onSubmit={() => {
              if (formRef.current.isValid) {
                props.onSubmit();
              }
            }}
            onSave={() => {
              if (formRef.current.isValid) {
                props.onSave();
              }
            }}
          />
        </Form>
      </Formik>
    </>
  );
};

export default BTForm;
