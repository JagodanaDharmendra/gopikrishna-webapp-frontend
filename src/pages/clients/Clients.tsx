import React, { useState, useEffect } from "react";
import * as apiService from "../../api-call";
import { API } from "../../constant/Endpoints";

const Clients: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any>(null);

  useEffect(() => {
    document.title = "Clients - Admin App";
  }, []);

  useEffect(() => {
    async function loadData() {
      const api = API.ENDPOINTS.FIND_ALL_CLIENT;
      try {
        const result = await apiService.getApi(api);
        const data = result.data;
        console.log(data);
        setClients(data.data);
      } catch (error) {
        setClients(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="px-6 mt-4 float-auto">
        <div className="flex">
          <h1>New Client</h1>
        </div>
      </div>
    </>
  );
};

export default Clients;
