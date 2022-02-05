import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ActionButtons, BackButton } from ".";
import { IOTAssessment } from "..";
import { Input } from "../../../atoms";

export interface IProps {
  initialValues: IOTAssessment;
  onSubmit: () => void;
  onSave: () => void;
  onSendMail: () => void;
  onViewAsPDF: () => void;
  onChange: (key: string, value: string) => void;
}

const OTForm = (props: IProps) => {
  const formRef: React.MutableRefObject<FormikProps<IOTAssessment>> =
    useRef<any>();

  const validate = Yup.object({
    therapist: Yup.string().required("Required"),
    assessment_date: Yup.date().max(new Date()).required("Required"),
    presenting_complaints: Yup.string().required("Required"),
    milestone_development: Yup.string().required("Required"),
    behavior_cognition: Yup.string().required("Required"),
    cognitive_skills: Yup.string().required("Required"),
    kinaesthesia: Yup.string().required("Required"),
  });

  function handleChange(e: any) {
    props.onChange(e.target.name, e.target.value);
  }

  useEffect(() => {
    const {
      therapist,
      assessment_date,
      presenting_complaints,
      milestone_development,
      behavior_cognition,
      cognitive_skills,
      kinaesthesia,
    } = props.initialValues;

    formRef.current.setValues({
      therapist: therapist ?? "",
      assessment_date: assessment_date ?? "",
      presenting_complaints: presenting_complaints ?? "",
      milestone_development: milestone_development ?? "",
      behavior_cognition: behavior_cognition ?? "",
      cognitive_skills: cognitive_skills ?? "",
      kinaesthesia: kinaesthesia ?? "",
    });
  }, [props.initialValues]);

  const IsCompleted = props.initialValues.email_sent;
  const IsDraft = props.initialValues.draft;
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
            value="OT"
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
            name="presenting_complaints"
            label="Presenting Complaints"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="milestone_development"
            label="Milestone Development"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="behavior_cognition"
            label="Behavior Cognition"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="cognitive_skills"
            label="Cognitive Skills"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="kinaesthesia"
            label="Kinaesthesia"
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

export default OTForm;
