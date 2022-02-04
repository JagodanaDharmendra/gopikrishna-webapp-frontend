import { Button, Label } from "../../../atoms";
import ITypeUser from "./UserItem.type";

interface IProps {
  index: number;
  value: ITypeUser;
  onClick: (value: { userName: string }) => {};
}

function UserItem({ index, value, onClick }: IProps) {
  console.log(value);
  return (
    <li
      key={`${index}_${value.department}`}
      className="rounded shadow-lg block m-3"
    >
      <div className="px-6 pt-4 pb-2 grid grid-cols-2 justify-between">
        <div className="">
          <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Name: {value.userName}
          </div>
          <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Department: {value.department}
          </div>

          <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Password: {value.pwd}
          </div>
        </div>
        <div className="flex justify-end items-center content-center">
          <Button
            secondary
            onClick={() => {
              onClick({ userName: value.userName });
            }}
          >
            <Label title="Delete" className=" text-white" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
