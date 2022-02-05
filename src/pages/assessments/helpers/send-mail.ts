import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";

async function sendMail(client_id: string, assessmentType: string, version: number) {
    console.log("Send Email Clicked");
    try {
        const api = API.ENDPOINTS.EMAIL_ASSESSMENT;
        const values = {
            client_id,
            assessmentType,
            version
        };
        const result = await apiService.postApi(api, values);
        console.log(result);
    } catch (error: any) { }
}

export default sendMail;