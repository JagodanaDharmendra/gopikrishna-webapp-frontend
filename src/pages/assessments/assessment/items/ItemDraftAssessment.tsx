import ButtonEditAssessment from "./ButtonEditAssessment";

const ItemDraftAssessment = (props: any) => {
  return (
    <div className="flex flex-col overflow-hidden shadow rounded bg-white border-2 border-gray p-4">
      <div>
        <div className="flex">Draft</div>
        <ButtonEditAssessment
          client_id={props.client_id}
          assessmentType={props.assessmentType}
          label="Edit"
        />
      </div>

      <div className="flex-col">
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

export default ItemDraftAssessment;
