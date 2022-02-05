import { Link, useNavigate } from "react-router-dom";
import { ITypeClient } from ".";
import { Button, Label } from "../../../atoms";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { useState } from "react";

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
        {props.assessment.includes("BT") && (
          <CreateEditAssessmentsButtons
            client_id={props.client_id}
            assessmentType="BT"
            currentVersion={Number(props.bt)}
          />
        )}

        {props.assessment.includes("ST") && (
          <CreateEditAssessmentsButtons
            client_id={props.client_id}
            assessmentType="ST"
            currentVersion={Number(props.st)}
          />
        )}

        {props.assessment.includes("OT") && (
          <CreateEditAssessmentsButtons
            client_id={props.client_id}
            assessmentType="OT"
            currentVersion={Number(props.ot)}
          />
        )}
      </div>
    </div>
  );
}

function CreateEditAssessmentsButtons(props: any) {
  const navigate = useNavigate();

  let { client_id, assessmentType, currentVersion } = props;

  assessmentType = assessmentType.toUpperCase();

  const [isCreating, setIsCreating] = useState(false);

  const onCreate = async () => {
    console.log("onCreate Clicked");
    try {
      const isConfirm: boolean = window.confirm(
        `Are you sure you want to create new Assessment?`,
      );
      if (isConfirm) {
        setIsCreating(true);
        const newVersion = currentVersion + 1;
        const api = API.ENDPOINTS.CREATE_ASSESSMENT;
        const values = {
          client_id: client_id,
          assessmentType: assessmentType,
          version: newVersion,
        };
        const result = await apiService.postApi(api, values);
        console.log(result);
        navigate(
          `/dashboard/assessment/${client_id}/${assessmentType}/${newVersion}`,
        );
      }
    } catch (error: any) {
      console.log(error.message || error);
    } finally {
      setIsCreating(false);
    }
  };

  const onEdit = async () => {
    console.log("onEdit Clicked");
    navigate(
      `/dashboard/assessment/${client_id}/${assessmentType}/${currentVersion}`,
    );
  };

  return (
    <div className="grid w-full justify-between items-center content-center space-y-3">
      <Button
        primary
        disabled={isCreating}
        onClick={onCreate}
        block
        className="h-12"
      >
        <Label
          title={`Create ${assessmentType} Assessment`}
          className="text-white text-xs"
        />
      </Button>
      {currentVersion !== -1 ? (
        <Button secondary onClick={onEdit} block className="h-12">
          <Label
            title={`Edit ${assessmentType} Assessment`}
            className="text-white text-xs"
          />
        </Button>
      ) : (
        <div className="grid-cols-1 h-12" />
      )}
    </div>
  );
}

export default ClientItem;
