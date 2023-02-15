import usersData from "../../data/users.json" assert { type: "json" };

export const loadApiEndpoints = (app) => {
  app.get("/api", (req, res) => {
    return res.status(200).send(usersData);
  });
};
