
import { API } from "../../../constant/Endpoints";
import * as apiService from "../../../api-call";

async function viewAsPDF(client_id: string, assessmentType: string, version: number) {
    console.log("Viewing as PDF");
    try {
        const api = API.ENDPOINTS.FIND_AS_PDF_ASSESSMENT(
            client_id,
            assessmentType,
            version
        );
        const result = await apiService.getApi(api);
        const _filePath = `${API.baseUrl}/${result.data.data.fileName}`;
        openInNewTab(_filePath);
    } catch (error: any) {
        console.log(error.message | error);
    }
}

const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
};

export default viewAsPDF;