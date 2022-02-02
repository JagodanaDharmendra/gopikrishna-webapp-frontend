import ButtonEditAssessment from "./ButtonEditAssessment";

const ItemCompletedAssessment = (props: any) => {
  return (
    <div className="flex flex-col w-full shadow rounded bg-white border-2 border-green p-4">
      <div>
        <div className="flex">Completed</div>
        <ButtonEditAssessment
          client_id={props.client_id}
          assessmentType={props.assessmentType}
        />
      </div>
      <div className="flex flex-col">
        {Object.keys(props).map((key) => {
          if (props.hasOwnProperty(key)) {
            return (
              <div className="flex">
                <h1>{`${key}-${props[key] ?? "null"}`}</h1>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ItemCompletedAssessment;
