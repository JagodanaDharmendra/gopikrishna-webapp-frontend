import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateClientForm } from "./views";

const Clients: React.FC<any> = () => {
  let params = useParams();
  const client_id = params.client_id;

  useEffect(() => {
    document.title = "Clients Edit - Admin App";
  }, []);

  return (
    <>
      <div className="px-4 mt-4 float-auto">
        <div className="flex flex-col">
          <div>Client Edit</div>
          <div className="m-4">
            <CreateClientForm client_id={client_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
