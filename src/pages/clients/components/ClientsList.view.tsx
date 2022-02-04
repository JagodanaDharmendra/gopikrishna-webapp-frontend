import { useEffect, useState } from "react";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { ClientItem, ITypeClient } from ".";

function ClientList() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Array<ITypeClient>>([]);
  const [, setError] = useState<string>("");

  async function loadData() {
    try {
      const api = API.ENDPOINTS.FIND_ALL_CLIENT;
      const result = await apiService.getApi(api);
      const data = result.data.data;
      setClients(data);
    } catch (error: any) {
      setClients([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteClient(values: { email: string }) {
    try {
      const api = API.ENDPOINTS.DELETE_CLIENT;
      await apiService.postApi(api, values);
      loadData();
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ul className="flex flex-col mt-4">
      {(!clients || clients.length === 0) && (
        <div className="w-full justify-center items-center text-center">
          <h1>No clients found</h1>
        </div>
      )}
      {clients?.map((value: ITypeClient, index: number) => {
        return (
          <li
            key={`${index}_${value.mobile_no}`}
            className="rounded shadow-lg block m-3"
          >
            <ClientItem {...value} onDeleteClick={deleteClient} />
          </li>
        );
      })}
    </ul>
  );
}

export default ClientList;
