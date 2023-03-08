export const getClients = async () => {
  const Clients = await fetch(`${process.env.REACT_APP_API}/clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return Clients.json();
};

