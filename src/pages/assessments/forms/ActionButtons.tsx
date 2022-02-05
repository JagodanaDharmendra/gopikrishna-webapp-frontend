import { Button } from "../../../atoms";

interface IProps {
  IsDraft: boolean | undefined;
  IsPending: boolean | undefined;
  IsCompleted: boolean | undefined;
  onSendMail: () => void;
  onViewAsPDF: () => void;
  onSubmit: () => void;
  onSave: () => void;
}

function ActionButtons(props: IProps) {
  return (
    <>
      {/* //Pending */}
      {(props.IsPending || props.IsCompleted) && (
        <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
          {!props.IsCompleted && (
            <Button
              onClick={() => {
                props.onSendMail?.();
              }}
              className="mt-2 py-2 px-12 shadow-lg"
              children="Send Mail"
              primary
              shadow
            />
          )}
          <Button
            onClick={() => {
              props.onViewAsPDF?.();
            }}
            className="mt-2 py-2 px-12 shadow-lg"
            children="View As PDF"
            primary
            shadow
          />
        </div>
      )}
      {/* //Draft */}
      {props.IsDraft && !props.IsPending && !props.IsCompleted && (
        <div className="lg:col-span-2 space-x-4 mx-auto flex justify-center">
          <Button
            onClick={() => {
              props.onSave?.();
            }}
            className="mt-2 py-2 px-12 shadow-lg"
            children="Save Draft"
            primary
            shadow
          />
          <Button
            onClick={() => {
              props.onSubmit?.();
            }}
            className="mt-2 py-2 px-12 shadow-lg"
            children="Submit"
            primary
            shadow
          />
        </div>
      )}
    </>
  );
}

export default ActionButtons;
