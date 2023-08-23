import { Capsule } from "../configs/types/Types";

export const fetchSpaceXData = async (filters:string):Promise<Capsule[]> => {
    const queryString = new URLSearchParams(filters).toString();
 return await fetch(`https://api.spacexdata.com/v3/capsules?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (e) => {
      const response = await e.json();
      console.log("response : ", response);
      return response;
    })
    .catch(() => {return []});
};
