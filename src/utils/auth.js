import { processServerResponse } from "./Api";
import { baseUrl } from "./constants";

export function signup(name, avatar, email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }).then(
      processServerResponse
    ),
  });
}

export function signin(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }).then(processServerResponse),
  });
}

export function signout() {
  localStorage.removeItem("token");
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}
const auth = { signup, signin, signout };
export default auth;
