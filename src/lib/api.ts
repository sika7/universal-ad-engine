export async function postRequest<T>(url: string, data: object = {}) {
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
};

export async function getRequest<T>(url: string) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
  });
  return response.json() as T;
};

