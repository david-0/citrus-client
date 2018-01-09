export interface SocketItem {
    action: "request" | "create" | "update" | "delete";
    item: any;
}
