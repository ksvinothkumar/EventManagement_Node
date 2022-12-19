var express = require("express");
var { Users } = require("../model/users");

var router = express.Router();

//user email and password validation
async function userEmailValidation(userDetails, login) {
  return await Users.find().then((data) => {
    if (data) {
      let filterResult = data.find((res) => res.email == userDetails.email);
      if (login) {
        let validUser = data.find(
          (res) =>
            res.email == userDetails.email &&
            res.password == userDetails.password
        );
        if (validUser) return validUser;

        return undefined;
      }
      return filterResult;
    }
  });
}

//User Login
router.post("/login", async (req, res) => {
  const userValidation = await userEmailValidation(req.body, true);
  if (userValidation == undefined) {
    return res.status(401).send({
      message: "Email and Password incorrect",
    });
  }
  res.status(200).send({
    message: "Successfully LoggedIn",
  });
});

//create registration
router.post("/registration", async (req, res) => {
  var registrationDetails = new Users(req.body);
  const userValidation = await userEmailValidation(req.body, false);
  if (userValidation == undefined) {
    registrationDetails["password"] = Math.random().toString(36).slice(-8);
    await registrationDetails
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Event registration successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  } else {
    res.status(400).send({
      message: "Email already exist",
    });
  }
});

//get all registration details except admin
router.get("/registration", (req, res) => {
  Users.find({ role: "USER" })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

//Delete all Registration records.
router.delete("/", (req, res) => {
  Users.deleteMany()
    .then((data) => {
      res.status(200).send({ message: "All data deleted successfully" });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

//Delete one Registration records.
router.delete("/:id", (req, res) => {

  Users.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "data deleted successfully" });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

module.exports = router;
