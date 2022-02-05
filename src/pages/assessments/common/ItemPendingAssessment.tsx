import { Button, Label } from "../../../atoms";
import { sendMail, viewAsPDF } from "../helpers";

const ItemPendingAssessment = (props: any) => {
  return (
    <div className="flex flex-col w-full shadow rounded bg-white border-2 border-orange p-4">
      <div>
        <div className="flex">Pending</div>
        <Button
          secondary
          onClick={() => {
            sendMail(props.client_id, props.assessmentType, props.version);
          }}
        >
          <Label title="Send Mail" className="text-white" />
        </Button>
        <Button
          secondary
          onClick={() => {
            viewAsPDF(props.client_id, props.assessmentType, props.version);
          }}
        >
          <Label title="View as PDF" className="text-white" />
        </Button>
      </div>

      {/* {filePath && filePath.length > 0 && <PDFViewer href={filePath} />} */}
      <div className="flex flex-col">
        {Object.keys(props).map((key) => {
          if (props.hasOwnProperty(key)) {
            return (
              <div className="flex">
                <h1>{`${key} ${props[key]}`}</h1>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ItemPendingAssessment;
