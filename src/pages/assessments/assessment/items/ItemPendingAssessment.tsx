import ButtonEditAssessment from "./ButtonEditAssessment";

const ItemPendingAssessment = (props: any) => {
  return (
    <div className="flex flex-col w-full shadow rounded bg-white border-2 border-orange p-4">
      <div>
        <div className="flex">Pending</div>
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
                <h1>{`${key} ${props[key]}`}</h1>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ItemPendingAssessment;
