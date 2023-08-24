import { Capsule } from "../configs/types/Types";

const LOCAL_STORAGE_KEY = "localstoredspacexdata";
const dataCache: Record<string, Capsule[]> = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
);

export const fetchSpaceXData = async (
  filters: Record<string, string>
): Promise<Capsule[]> => {
  const filtersString: string = JSON.stringify(filters);

  if (dataCache[filtersString]) {
    return dataCache[filtersString];
  }

  const queryString = new URLSearchParams(filters).toString();
  const fetchedData = await fetch(
    `https://api.spacexdata.com/v3/capsules?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch(() => []);

  dataCache[filtersString] = fetchedData;

  // Store the updated dataCache in local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataCache));

  return fetchedData;
};
