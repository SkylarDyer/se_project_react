import React from "react";
import { headers, baseUrl } from "./constants";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  const clothingApi = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
  return clothingApi;
};

export const deleteClothingItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application / json" },
  }).then(processServerResponse);
};

export const addClothingItem = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application / json" },
    body: JSON.stringify({
      name: newItem.name,
      imageUrl: newItem.imageUrl,
      weather: newItem.weather,
    }),
  }).then(processServerResponse);
};
