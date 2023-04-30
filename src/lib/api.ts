export type RequestType = "get" | "post";
export type Parameter = Record<string, string | number | boolean>;
export type ValidationSetting = Record<string, string>;

function convertObjectToQueryParams(params: Parameter): string {
  const queryParams = Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value === undefined) {
        return "";
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        value.toString()
      )}`;
    })
    .filter((queryParam) => queryParam !== "")
    .join("&");
  return `?${queryParams}`;
}

function setQueryParams(url: string, parameter: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.search = parameter;
  return parsedUrl.toString();
}

async function postRequest<T>(url: string, data: Parameter = {}) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify(data),
  });
  return response.json() as T;
}

async function getRequest<T>(url: string, data: Parameter = {}) {
  const response = await fetch(
    setQueryParams(url, convertObjectToQueryParams(data)),
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
    }
  );
  return response.json() as T;
}

export async function apiRequest<T>(
  requestType: RequestType,
  url: string,
  data: Parameter = {}
): Promise<T> {
  if (requestType === "post") return postRequest<T>(url, data);
  return getRequest<T>(url, data);
}

export type ApiSetting = {
  url: string;
  type: RequestType;
  parameter?: Record<string, string | number | boolean>;
  validation?: Record<string, string>;
};


export type RequiredApiSetting = Required<ApiSetting>;
