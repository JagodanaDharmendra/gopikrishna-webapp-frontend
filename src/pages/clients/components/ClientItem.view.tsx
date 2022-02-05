import { Link } from "react-router-dom";
import { ITypeClient } from ".";
import { Button, Label } from "../../../atoms";

interface IProps extends ITypeClient {
  onDeleteClick: (value: { email: string }) => void;
}

function ClientItem(props: IProps) {
  return (
    <div className="px-6 pt-4 pb-2 grid grid-cols-1 lg:grid-cols-2 justify-between">
      <div className="">
        <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Name: {props.name}
        </div>
        <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Email: {props.email}
        </div>
        <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Mobile Number: {props.mobile_no}
        </div>
      </div>
      <div className="flex justify-center lg:justify-end items-center content-center space-x-2">
        <Link
          to={`/dashboard/clients/edit/${props.client_id}`}
          className="flex items-center py-4 col-span-1"
        >
          <Button secondary onClick={() => {}}>
            <Label title="Edit Client" className="text-white" />
          </Button>
        </Link>
        <Button
          secondary
          onClick={() => {
            props.onDeleteClick({ email: props.email });
          }}
        >
          <Label title="Delete Client" className="text-white" />
        </Button>
      </div>

      <div className="flex flex-row justify-center lg:justify-end items-center content-center space-x-2">
        <CreateEditAssessmentsButtons
          client_id={props.client_id}
          assessment={props.assessment}
          assessmentType="BT"
          currentVersion={Number(props.bt)}
        />

        <CreateEditAssessmentsButtons
          client_id={props.client_id}
          assessment={props.assessment}
          assessmentType="ST"
          currentVersion={Number(props.st)}
        />

        <CreateEditAssessmentsButtons
          client_id={props.client_id}
          assessment={props.assessment}
          assessmentType="OT"
          currentVersion={Number(props.ot)}
        />
      </div>
    </div>
  );
}

function CreateEditAssessmentsButtons({
  client_id,
  assessment,
  assessmentType,
  currentVersion,
}: any) {
  assessmentType = assessmentType.toUpperCase();
  return (
    <>
      {assessment.includes(assessmentType) && (
        <div className="flex flex-col w-full justify-center items-center">
          <Link
            to={`/dashboard/assessment/${client_id}/${assessmentType}/${
              currentVersion + 1
            }`}
            className="flex items-center py-4 col-span-1"
          >
            <Button primary onClick={() => {}}>
              <Label
                title={`Create ${assessmentType} Assessment`}
                className="text-white"
              />
            </Button>
          </Link>

          {currentVersion != -1 && (
            <Link
              to={`/dashboard/assessment/${client_id}/${assessmentType}/${currentVersion}`}
              className="flex items-center py-4 col-span-1"
            >
              <Button secondary onClick={() => {}}>
                <Label
                  title={`Edit ${assessmentType} Assessment`}
                  className="text-white"
                />
              </Button>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
export default ClientItem;
