import { baseUrl } from "./constants";

export class ClothesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };
  getClothes = (token) => {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  };

  addNewClothes(item) {
    const token = localStorage.getItem("token");
    return fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authroization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
        owner: item.owner,
      }),
    }).then(this.processServerResponse);
  }
  deleteClothes(item, token) {
    return fetch(`${this._baseUrl}/items/${item}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      },
    }).then(this.processServerResponse);
  }
  dislikeItem(_id, token) {
    return fetch(`${this._baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
}
export const clothesApi = new ClothesApi({ baseUrl });
