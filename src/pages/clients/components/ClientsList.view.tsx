import { useEffect, useState } from "react";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { ClientItem, ITypeClient } from ".";
import { Search } from "../../../molecules";

function ClientList() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Array<ITypeClient>>([]);
  const [, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

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
    const isConfirm: boolean = window.confirm(
      `Are you sure you want to remove client(${values.email})?`,
    );
    if (!isConfirm) {
      window.alert("Request to remove a client cancelled.");
      return;
    }

    try {
      const api = API.ENDPOINTS.DELETE_CLIENT;
      await apiService.postApi(api, values);
      loadData();
      window.alert("The client successfully removed.");
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const clientSearchResult =
    clients &&
    clients.filter((value: ITypeClient) => {
      if (!searchQuery || searchQuery.length <= 0) {
        return true;
      }
      if (
        searchQuery &&
        searchQuery.length > 0 &&
        (value.name.includes(searchQuery) ||
          value.email.includes(searchQuery) ||
          value.mobile_no.includes(searchQuery))
      ) {
        return true;
      }
      return false;
    });

  return (
    <div className="flex justify-center flex-col items-center w-full">
      {clients.length > 0 && (
        <div className="flex my-3">
          <Search
            onSearch={(query) => {
              setSearchQuery(query);
            }}
            onClear={() => {
              setSearchQuery("");
            }}
          />
        </div>
      )}
      <ul className="flex w-full flex-col">
        {(!clientSearchResult || clientSearchResult.length === 0) && (
          <div className="w-full justify-center items-center text-center">
            <h1>No clients found</h1>
          </div>
        )}
        {clientSearchResult?.map((value: ITypeClient, index: number) => {
          return (
            <li
              key={`${index}_${value.mobile_no}`}
              className="rounded shadow-lg block p-2 my-1"
            >
              <ClientItem {...value} onDeleteClick={deleteClient} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientList;
