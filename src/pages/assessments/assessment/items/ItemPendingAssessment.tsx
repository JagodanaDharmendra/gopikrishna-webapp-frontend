import { useState } from "react";
import { Button, Label } from "../../../../atoms";
import { API } from "../../../../constant/Endpoints";
import * as apiService from "../../../../api-call";

const ItemPendingAssessment = (props: any) => {
  const [, setFilePath] = useState("");

  async function sendMail() {
    console.log("Send Email Clicked");
    try {
      const api = API.ENDPOINTS.EMAIL_ASSESSMENT;
      const values = {
        client_id: props.client_id,
        assessmentType: props.assessmentType,
      };
      await apiService.postApi(api, values);
    } catch (error: any) {}
  }

  async function viewAsPDF() {
    console.log("Viewing as PDF");
    try {
      const api = API.ENDPOINTS.FIND_AS_PDF_ASSESSMENT(
        props.client_id,
        props.assessmentType,
      );
      const result = await apiService.getApi(api);
      const _filePath = `${API.baseUrl}/${result.data.data.fileName}`;
      openInNewTab(_filePath);
      setFilePath(_filePath);
    } catch (error: any) {
      console.log(error.message | error);
    }
  }

  return (
    <div className="flex flex-col w-full shadow rounded bg-white border-2 border-orange p-4">
      <div>
        <div className="flex">Pending</div>
        <Button
          secondary
          onClick={() => {
            sendMail();
          }}
        >
          <Label title="Send Mail" className="text-white" />
        </Button>
        <Button
          secondary
          onClick={() => {
            viewAsPDF();
          }}
        >
          <Label title="View as PDF" className="text-white" />
        </Button>
      </div>

      {/* {filePath && filePath.length > 0 && <PDFViewer href={filePath} />} */}
      <div className="flex flex-col">
        {Object.keys(props).map((key) => {
          if (props.hasOwnProperty(key)) {
            return (
              <div className="flex">
                <h1>{`${key} ${props[key]}`}</h1>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export default ItemPendingAssessment;
