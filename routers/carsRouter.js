const express = require("express");

const db = require("../data/config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await db.select("*").from("cars");
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messate: "there was an error", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await db
      .first("*")
      .from("cars")
      .where("id", req.params.id);
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messate: "there was an error", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = {
      VIN: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      milage: req.body.milage,
      transmissionType: req.body.transmissionType,
      titleStatus: req.body.titleStatus
    };
    const [id] = await db.insert(payload).into("cars");
    console.log(id);
    const newCar = await db
      .first("*")
      .from("cars")
      .where("id", id);
    res.status(201).json(newCar);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messate: "there was an error", error: err });
  }
});

module.exports = router;