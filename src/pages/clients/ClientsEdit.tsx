import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateClientForm } from "./components";

function ClientsEdit() {
  let params = useParams();
  const client_id = params.client_id;

  useEffect(() => {
    document.title = "Clients Edit - Admin App";
  }, []);

  return (
    <>
      <div className="px-4 mt-4 float-auto">
        <div className="flex flex-col">
          <h1 className="flex w-full justify-center text-center font-bold text-primary uppercase text-xl">
            Client Edit
          </h1>
          <div className="m-4">
            <CreateClientForm client_id={client_id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientsEdit;
