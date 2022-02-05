import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IBTAssessment } from "..";
import { Button, Input } from "../../../atoms";
import { sendMail, viewAsPDF } from "../helpers";

export interface IProps {
  initialValues: IBTAssessment;
  onSubmit?: () => void;
  onSave?: () => void;
  onChange?: (key: string, value: string) => void;
}

const BTForm = (props: IProps) => {
  const navigate = useNavigate();
  let location: Location = useLocation();
  const state: any = location.state;
  let from = state?.from?.pathname || "/dashboard/assessments";

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
    props.onChange?.(e.target.name, e.target.value);
  }

  const handleSubmit = async (values: IBTAssessment) => {};

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
  const IsDraft = props.initialValues.draft;
  const IsPending = !IsDraft && !IsCompleted;
  const disabled = !IsDraft;

  return (
    <>
      {/* GO Back Button */}
      <div className="lg:col-span-2 space-x-4  flex justify-left">
        <Button
          onClick={() => {
            navigate(from, { replace: true });
          }}
          className="mt-2 py-2 px-12 shadow-lg"
          children="Go Back"
          primary
          shadow
        />
      </div>

      <Formik
        initialValues={props.initialValues}
        onSubmit={handleSubmit}
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
            value={props.initialValues.therapist}
            disabled={disabled}
          />
          <Input
            name="assessment_date"
            label="Assessment Date"
            onChange={handleChange}
            required
            // value={props.initialValues.assessment_date}
            type="date"
            disabled={disabled}
          />
          <Input
            name="prenatal_history"
            label="Prenatal History"
            onChange={handleChange}
            required
            value={props.initialValues.prenatal_history}
            disabled={disabled}
          />
          <Input
            name="family_history"
            label="Family History"
            onChange={handleChange}
            required
            value={props.initialValues.family_history}
            disabled={disabled}
          />
          <Input
            name="development_history"
            label="Development History"
            onChange={handleChange}
            required
            value={props.initialValues.development_history}
            disabled={disabled}
          />
          <Input
            name="school_history"
            label="School History"
            onChange={handleChange}
            required
            value={props.initialValues.school_history}
            disabled={disabled}
          />
          <Input
            name="tests_administered"
            label="Tests Administered"
            onChange={handleChange}
            required
            value={props.initialValues.tests_administered}
            disabled={disabled}
          />
          <Input
            name="behavior_observation"
            label="Behavior Observation"
            onChange={handleChange}
            required
            value={props.initialValues.behavior_observation}
            disabled={disabled}
          />
          <Input
            name="test_results"
            label="Test Results"
            onChange={handleChange}
            required
            value={props.initialValues.test_results}
            disabled={disabled}
          />
          <Input
            name="impression"
            label="Impression"
            onChange={handleChange}
            required
            value={props.initialValues.impression}
            disabled={disabled}
          />
          <Input
            name="recommendations"
            label="Recommendations"
            onChange={handleChange}
            required
            value={props.initialValues.recommendations}
            disabled={disabled}
          />

          {/* //Pending */}
          {(IsPending || IsCompleted) && (
            <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
              {!IsCompleted && (
                <Button
                  onClick={() => {
                    sendMail(
                      String(props.initialValues.client_id),
                      String(props.initialValues.assessmentType),
                      Number(props.initialValues.version),
                    ).then(() => {
                      window.alert("Mail sent successfully.");
                      window.location.reload();
                    });
                  }}
                  className="mt-2 py-2 px-12 shadow-lg"
                  children="Send Mail"
                  primary
                  shadow
                />
              )}
              <Button
                onClick={() => {
                  viewAsPDF(
                    String(props.initialValues.client_id),
                    String(props.initialValues.assessmentType),
                    Number(props.initialValues.version),
                  );
                }}
                className="mt-2 py-2 px-12 shadow-lg"
                children="View As PDF"
                primary
                shadow
              />
            </div>
          )}
          {/* //Draft */}
          {IsDraft && !IsPending && !IsCompleted && (
            <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
              <Button
                onClick={() => {
                  props.onSave?.();
                }}
                className="mt-2 py-2 px-12 shadow-lg"
                children="Save Draft"
                primary
                shadow
              />
              <Button
                onClick={() => {
                  props.onSubmit?.();
                }}
                className="mt-2 py-2 px-12 shadow-lg"
                children="Submit"
                primary
                shadow
              />
            </div>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default BTForm;
