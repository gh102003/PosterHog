import { BACKEND_URL } from "../constants";

export function constructScanLink(linkUuid: string): string {
    return `${BACKEND_URL}/scan/${linkUuid}`
}