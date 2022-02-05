import { DataItem } from ".";
import { Button, Label } from "../../../atoms";
import { sendMail, viewAsPDF } from "../helpers";

const ItemPendingAssessment = (props: any) => {
  return (
    <>
      <div className="grid grid-flow-row md:grid-flow-col w-full shadow-2xl rounded p-4 bg-white my-2 border-2 border-orange">
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
        <div className="grid-cols-1 flex flex-col justify-center items-center md:items-end content-center md:content-end gap-2">
          <Button
            primary
            onClick={() => {
              sendMail(
                props.client_id,
                props.assessmentType,
                props.version,
              ).then(() => {
                window.alert("Mail sent successfully.");
                window.location.reload();
              });
            }}
            className="w-40 max-w-xs h-10"
          >
            <Label title="Send Mail" className="text-white" />
          </Button>
          <Button
            secondary
            onClick={() => {
              viewAsPDF(props.client_id, props.assessmentType, props.version);
            }}
            className="w-40 max-w-xs h-10"
          >
            <Label title="View as PDF" className="text-white" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemPendingAssessment;
