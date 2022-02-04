import { Link } from "react-router-dom";
import { ITypeClient } from ".";
import { Button, Label } from "../../../atoms";

interface IProps extends ITypeClient {
  onDeleteClick: (value: { email: string }) => void;
}

function ClientItem(props: IProps) {
  return (
    <div className="px-6 pt-4 pb-2 grid grid-cols-2 justify-between">
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
      <div className="flex justify-end items-center content-center space-x-2">
        <Link
          to={`/dashboard/assessment/${props.client_id}`}
          className="flex items-center py-4 col-span-1"
        >
          <Button secondary onClick={() => {}}>
            <Label title="Edit Assessment" className="text-white" />
          </Button>
        </Link>

        <Link
          to={`/dashboard/clients/edit/${props.client_id}`}
          className="flex items-center py-4 col-span-1"
        >
          <Button secondary onClick={() => {}}>
            <Label title="Edit" className="text-white" />
          </Button>
        </Link>
        <Button
          secondary
          onClick={() => {
            props.onDeleteClick({ email: props.email });
          }}
        >
          <Label title="Delete" className="text-white" />
        </Button>
      </div>
    </div>
  );
}

export default ClientItem;
