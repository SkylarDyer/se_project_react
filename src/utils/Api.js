const baseUrl = "http://localhost:3001";
export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  const clothingApi = fetch(`${baseUrl}/items`).then(processServerResponse);
  return clothingApi;
};

export const deleteClothingItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": application / json },
  }).then(processServerResponse);
};

export const addClothingItem = ({ clothingName, imageLoc, weatherType }) => {
  return fetch(`${baseUrl}/items/`, {
    method: "POST",
    body: JSON.stringify({
      name: clothingName,
      url: imageLoc,
      weather: weatherType,
    }),
    headers: { "Content-Type": application / json },
  }).then(processServerResponse);
};
