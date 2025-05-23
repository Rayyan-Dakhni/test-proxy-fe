export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Optional: decode token and check expiration
  return true;
};
