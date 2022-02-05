interface ITypeClient {
    client_id?: string;
    mobile_no: string;
    name: string;
    gender: "male" | "female" | "other";
    dob: Date;
    alt_mobile_no: string;
    email: string;
    address: string;
    mother_tongue: string;
    f_name: string;
    m_name: string;
    discontinued: boolean;
    discontinued_on: Date;
    created_on?: string;
    created_by?: string;
    modified_on?: string;
    modified_by?: string;
    branch: string;
    assessment: Array<"BT" | "ST" | "OT">;
    chief_complaints: string;
    diagnosis: string;
    slot_time: Date;
    therapy: Array<"BT" | "ST" | "OT" | "PT" | "SE">;
    bt?: number,
    st?: number,
    ot?: number
}

export default ITypeClient;