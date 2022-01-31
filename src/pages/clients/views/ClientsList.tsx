import { useEffect, useState } from "react";
import { Button, Label } from "../../../atoms";
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";
import { Link } from "react-router-dom";

interface ITypeClient {
  client_id: string;
  name: string;
  mobile_no: string;
  email: string;
  assessment: "BT" | "ST" | "OT";
}

const View = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Array<ITypeClient>>([]);
  const [error, setError] = useState<string>("");

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

  async function deleteClient(values: any) {
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
      {!clients ||
        (clients.length == 0 && (
          <div className="w-full justify-center items-center text-center">
            <h1>No data found for Clients</h1>
          </div>
        ))}
      {clients?.map((value: ITypeClient, index: number) => {
        return (
          <li
            key={`${index}_${value.mobile_no}`}
            className="rounded shadow-lg block m-3"
          >
            <div className="px-6 pt-4 pb-2 grid grid-cols-2 justify-between">
              <div className="">
                <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Name: {value.name}
                </div>
                <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Email: {value.email}
                </div>
                <div className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Mobile Number: {value.mobile_no}
                </div>
              </div>
              <div className="flex justify-end items-center content-center space-x-2">
                <Link
                  to={`/dashboard/assessment/${value.client_id}`}
                  className="flex items-center py-4 col-span-1"
                >
                  <Button secondary onClick={() => {}}>
                    <Label title="Edit Assessment" className="text-white" />
                  </Button>
                </Link>

                <Link
                  to={`/dashboard/clients/edit/${value.client_id}`}
                  className="flex items-center py-4 col-span-1"
                >
                  <Button secondary onClick={() => {}}>
                    <Label title="Edit" className="text-white" />
                  </Button>
                </Link>
                <Button
                  secondary
                  onClick={() => {
                    deleteClient({ email: value.email });
                  }}
                >
                  <Label title="Delete" className="text-white" />
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default View;
