import { DataItem } from ".";
import ButtonEditAssessment from "./ButtonEditAssessment";

const ItemCompletedAssessment = (props: any) => {
  return (
    <>
      <div className="grid grid-flow-row md:grid-flow-col w-full shadow-2xl rounded p-4 bg-white my-2 border-2 border-green">
        <div className="grid-cols-1 flex-col">
          <DataItem title="Client ID:" value={props.client_id} />
          <DataItem title="Therapist: " value={props.therapist} />
          <DataItem title="Assessment Date:" value={props.assessment_date} />
          <DataItem title="version:" value={props.version} />
          <div className="justify-end items-end content-center text-sm text-gray pt-3">
            Modified by <span className="text-orange">{props.modified_by}</span>{" "}
            on{" "}
            <span className="text-orange">
              {new Date(props.modified_on).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="grid-cols-1 flex flex-col justify-center items-center md:items-end content-center md:content-end">
          <ButtonEditAssessment
            client_id={props.client_id}
            assessmentType={props.assessmentType}
            version={props.version}
            label="View"
          />
        </div>
      </div>
    </>
  );
};

export default ItemCompletedAssessment;
