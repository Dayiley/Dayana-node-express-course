const { people } = require("../data");

const getPeople = (req, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, name });
};

const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }
  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }
  person.name = req.body.name || person.name;
  res.status(200).json({ success: true, person });
};

const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const index = people.findIndex((p) => p.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }
  people.splice(index, 1);
  res.status(200).json({ success: true, message: "Person deleted" });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
