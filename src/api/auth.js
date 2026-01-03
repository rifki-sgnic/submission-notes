export const BASE_URL = "https://notes-api.dicoding.dev/v1";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

export async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null, message: responseJson.message };
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
}

export async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null, message: responseJson.message };
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
}

export async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null, message: responseJson.message };
  }

  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
}
