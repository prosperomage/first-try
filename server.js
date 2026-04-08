const express = require("express");

const app = express();

//dummy data
const users = [
  { id: 1, name: "Ada Lovelace", role: "admin" },
  { id: 2, name: "Grace Hopper", role: "user" },
];

//GET
app.get("/users", (req, res) => {
  const { role } = req.query;
  const result = role ? users.filter((u) => u.role === role) : users;
  res.status(200).json(result);
});

//GET by id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

//POST route
app.post("/users/", (req, res) => {
  const [role, name] = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  const newUser = { id: users.length + 1, name, role: role || "user" };
  users.push(newUser);
  res.status(201).json(newUser); //201 created
});

//PUT
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ error: "error adding name" });

  users[index] = { id, ...req.body };
  res.status(200).json(users[index]);
});

//patch
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ error: "cant edit user" });
  Object.assign(user, req.body);
  res.status(200).json(user);
});

//delete
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (!index === -1) res.status(404).json({ error: "cannnt delete users" });
  users.splice(index, 1);
  res.status(200).json({ error: `user ${id} as been deleted ` });
});

app.listen(4000, () => console.log("server is running on port 4000"));
