import { CONFIG } from "@/config/config";

export default function Storage(url: string | undefined) {
  return !url?.startsWith("uploads/")
    ? `${CONFIG.NETSUITE_STORAGE_URL}/${url}`
    : `${CONFIG.STORAGE_URL}/${url}`;
}
