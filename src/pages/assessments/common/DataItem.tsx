import { Label } from "../../../atoms";

interface IProps {
  title: string;
  value: string;
}

function DataItem(props: IProps) {
  return (
    <>
      <div className="flex space-x-1">
        <Label title={props.title} primary />
        <Label title={props.value} gray />
      </div>
    </>
  );
}

export default DataItem;
