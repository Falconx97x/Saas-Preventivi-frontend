const BASE_URL = "http://localhost:3001";

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

let data;
try {

  data = JSON.parse(text);
  console.log("Parsed data:", data);
} catch {
  console.error("SERVER RESPONSE:", text); // 🔥 fondamentale
  throw new Error("Il server non ha restituito JSON");
}

  if (!res.ok) {
    throw new Error(data.error || "Errore API");
  }

  return data;
};


export const getDashboard = () => {
  console.log("Fetching dashboard data..."); 

  return authFetch("/dashboard");
};

export const getClients = () => {
  console.log("Fetching clients data...");
  return authFetch("/clients");
};

export const getQuotes = () => {
  console.log("Fetching quotes data...");
  return authFetch("/quotes");
};

export const createQuote = (quoteData: {
  clientId: number;
  description: string;
  amount: number;
}) => {
  console.log("Creating quote with data:", quoteData);
  return authFetch("/quotes", {
    method: "POST",
    body: JSON.stringify(quoteData),
  });
};

export const register = (userData: {
  username: string;
  password: string;
}) => {
  console.log("Registering user with data:", userData);
  return authFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const login = (credentials: {
  username: string;
  password: string;
}) => {
  console.log("Logging in with credentials:", credentials);
  return authFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const logout = () => {
  console.log("Logging out...");
  return authFetch("/auth/logout", {
    method: "POST",
  });
};
