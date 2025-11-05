import api from "./api";

export const getUserProfileService = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const loginService = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const logoutService = async () => {
  await api.post("/logout");
};

export const signupService = async ({ fullName, email, password }) => {
  const response = await api.post("/signup", { fullName, email, password });
  return response.data;
};
