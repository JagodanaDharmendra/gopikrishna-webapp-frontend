interface ITypeUser {
    userName: string;
    pwd?: string;
    department: "BT" | "OT" | "ST" | "PT" | "SE" | "FO";
}

export default ITypeUser;