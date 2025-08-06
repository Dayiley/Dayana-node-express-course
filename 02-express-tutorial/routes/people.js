const express = require("express");
const router = express.Router();

const {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.get("/", getPeople);
router.get("/:id", getPersonById);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
