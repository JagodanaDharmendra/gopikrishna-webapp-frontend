import { Button } from "../../../atoms";
import { Location, useLocation, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  let location: Location = useLocation();
  const state: any = location.state;
  let from = state?.from?.pathname || "/dashboard/assessments";

  return (
    <>
      {/* GO Back Button */}
      <div className="lg:col-span-2 space-x-4  flex justify-left">
        <Button
          onClick={() => {
            navigate(from, { replace: true });
          }}
          className="mt-2 py-2 px-12 shadow-lg"
          children="Go Back"
          primary
          shadow
        />
      </div>
    </>
  );
}

export default BackButton;
