import { Link } from "react-router-dom";
import { Button, Label } from "../../../../atoms";

interface IType {
  client_id: string;
  assessmentType: String;
  label?: String;
}

const ButtonEditAssessment = (props: IType) => {
  return (
    <Link
      to={`/dashboard/assessment/${props.client_id}/${props.assessmentType}`}
      className="flex items-center py-4 col-span-1"
    >
      <Button secondary onClick={() => {}}>
        <Label
          title={`${props.label ?? "View Assessment"}`}
          className="text-white"
        />
      </Button>
    </Link>
  );
};

export default ButtonEditAssessment;
