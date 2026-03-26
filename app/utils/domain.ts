import process from "process";
import { isProduction } from "@/utils/environment";

export function getApiDomain(): string {
  const prodUrl = process.env.NEXT_PUBLIC_PROD_API_URL ||
    "https://sopra-fs26-group-02-server.oa.r.appspot.com"; 
  const devUrl = "http://localhost:8080";
  return isProduction() ? prodUrl : devUrl;
}
