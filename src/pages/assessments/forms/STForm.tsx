import { Formik, FormikProps, Form } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ActionButtons, BackButton } from ".";
import { ISTAssessment } from "..";
import { Input } from "../../../atoms";

export interface IProps {
  initialValues: ISTAssessment;
  onSubmit: () => void;
  onSave: () => void;
  onSendMail: () => void;
  onViewAsPDF: () => void;
  onChange: (key: string, value: string) => void;
}

const STForm = (props: IProps) => {
  const formRef: React.MutableRefObject<FormikProps<ISTAssessment>> =
    useRef<any>();

  const validate = Yup.object({
    therapist: Yup.string().required("Required"),
    assessment_date: Yup.date().max(new Date()).required("Required"),
    daddling: Yup.string().required("Required"),
    first_word: Yup.string().required("Required"),
    main_mode_comm: Yup.string().required("Required"),
    family_history: Yup.string().required("Required"),
    motor_developments: Yup.string().required("Required"),
    oro_peripheral_mechanism: Yup.string().required("Required"),
    vegetative_skills: Yup.string().required("Required"),
    vision: Yup.string().required("Required"),
    hearing: Yup.string().required("Required"),
    response_to_name_call: Yup.string().required("Required"),
    environmental_sounds: Yup.string().required("Required"),
    eye_contact: Yup.string().required("Required"),
    attention_to_sound: Yup.string().required("Required"),
    limitation_to_body_movements: Yup.string().required("Required"),
    limitation_to_speech: Yup.string().required("Required"),
    attention_level: Yup.string().required("Required"),
    social_smile: Yup.string().required("Required"),
    initiate_interaction: Yup.string().required("Required"),
    receptive_lang: Yup.string().required("Required"),
    expressive_lang: Yup.string().required("Required"),
    test_administered: Yup.string().required("Required"),
    reels_rl_score: Yup.string().required("Required"),
    reels_el_score: Yup.string().required("Required"),
    provisional_diagnosis: Yup.string().required("Required"),
    recommendations: Yup.string().required("Required"),
  });

  function handleChange(e: any) {
    props.onChange?.(e.target.name, e.target.value);
  }

  useEffect(() => {
    const {
      therapist,
      assessment_date,
      daddling,
      first_word,
      main_mode_comm,
      family_history,
      motor_developments,
      oro_peripheral_mechanism,
      vegetative_skills,
      vision,
      hearing,
      response_to_name_call,
      environmental_sounds,
      eye_contact,
      attention_to_sound,
      limitation_to_body_movements,
      limitation_to_speech,
      attention_level,
      social_smile,
      initiate_interaction,
      receptive_lang,
      expressive_lang,
      test_administered,
      reels_rl_score,
      reels_el_score,
      provisional_diagnosis,
      recommendations,
    } = props.initialValues;

    formRef.current.setValues({
      therapist: therapist ?? "",
      assessment_date: assessment_date ?? "",
      daddling: daddling ?? "",
      first_word: first_word ?? "",
      main_mode_comm: main_mode_comm ?? "",
      family_history: family_history ?? "",
      motor_developments: motor_developments ?? "",
      oro_peripheral_mechanism: oro_peripheral_mechanism ?? "",
      vegetative_skills: vegetative_skills ?? "",
      vision: vision ?? "",
      hearing: hearing ?? "",
      response_to_name_call: response_to_name_call ?? "",
      environmental_sounds: environmental_sounds ?? "",
      eye_contact: eye_contact ?? "",
      attention_to_sound: attention_to_sound ?? "",
      limitation_to_body_movements: limitation_to_body_movements ?? "",
      limitation_to_speech: limitation_to_speech ?? "",
      attention_level: attention_level ?? "",
      social_smile: social_smile ?? "",
      initiate_interaction: initiate_interaction ?? "",
      receptive_lang: receptive_lang ?? "",
      expressive_lang: expressive_lang ?? "",
      test_administered: test_administered ?? "",
      reels_rl_score: reels_rl_score ?? "",
      reels_el_score: reels_el_score ?? "",
      provisional_diagnosis: provisional_diagnosis ?? "",
      recommendations: recommendations ?? "",
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
            value="ST"
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
            disabled={disabled}
            type="date"
          />
          <Input
            name="daddling"
            label="Daddling"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="first_word"
            label="First Word"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="main_mode_comm"
            label="Main Mode Comm"
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
            name="motor_developments"
            label="Motor Developments"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="oro_peripheral_mechanism"
            label="Oro Peripheral Mechanism"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="vegetative_skills"
            label="Vegetative Skills"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="vision"
            label="Vision"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="hearing"
            label="Hearing"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="response_to_name_call"
            label="Response To Name Call"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="environmental_sounds"
            label="Environmental Sounds"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="eye_contact"
            label="Eye Contact"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="attention_to_sound"
            label="Attention to Sound"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="limitation_to_body_movements"
            label="Limitation to Body Movements"
            onChange={handleChange}
            required
            disabled={disabled}
          />
          <Input
            name="limitation_to_speech"
            label="Limitation to Speech"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="attention_level"
            label="Attention Level"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="social_smile"
            label="Social Smile"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="initiate_interaction"
            label="Initiate Interaction"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="receptive_lang"
            label="Receptive Lang"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="expressive_lang"
            label="Expressive Lang"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="test_administered"
            label="Test Administered"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="reels_rl_score"
            label="Reels RL Score"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="reels_el_score"
            label="Reels EL Score"
            onChange={handleChange}
            required
            disabled={disabled}
          />

          <Input
            name="provisional_diagnosis"
            label="Provisional Diagnosis"
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

export default STForm;
