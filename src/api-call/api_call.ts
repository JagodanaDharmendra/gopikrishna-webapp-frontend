import { AxiosError, AxiosResponse, BaseClient, CookieHelper } from "../libs";

const baseClient = new BaseClient();

export const getApi = (api: string) => {
  const config = {
    headers: headers(),
  };
  return baseClient.apiGet(api, config);
};

export const postApi = async (
  api: string,
  data: any,
): Promise<AxiosResponse<any, any>> => {
  const config = {
    headers: headers(),
  };
  return new Promise((resolve, reject): any => {
    baseClient
      .apiPost(api, data, config)
      .then(resolve)
      .catch((err: AxiosError) => {
        reject(err.response);
      });
  });
};

export const putApi = (api: string, data: any) => {
  const config = {
    headers: headers(),
  };
  return baseClient.apiPost(api, data, config);
};

export const patchApi = (api: string, data: any) => {
  const config = {
    headers: headers(),
  };
  return baseClient.apiPatch(api, data, config);
};

export const deleteApi = (api: string, data: any) => {
  const config = {
    headers: headers(),
  };
  return baseClient.apiDelete(api, config);
};

const headers = () => {
  return { Authorization: `Bearer ${token()}`, 'UserId': `${userId()}` };
};

const userId = () => {
  return CookieHelper.GetCookie("user_id") ?? "Error";
}

const token = () => {
  return CookieHelper.GetCookie("token") ?? "Error";
};
