const express = require("express");

const router = express.Router();

const burger = require("../models/burger");


router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const burgerObj = {
      burgers: data,
    };
    console.log(burgerObj);
    res.render("index", burgerObj);
  });
});

router.get("/api/burgers", (req, res) => {
  burger.selectAll((data) => {
    const burgerObj = {
      burgers: data,
    };
    console.log(burgerObj);
    res.json(burgerObj);
  });
});



router.post("/api/burgers", (req, res) => {
  console.log( `req: ${req}`);
  burger.insertOne(['burger_name'],[req.body.burger_name], (result) => {
    
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const selectionID = `id = ${req.params.id}`;

  console.log("ID Selected:", selectionID);

  burger.updateOne(
    {
      devoured: "1",
    },
    selectionID,
    (result) => {
      if (result.changedRows === 0) {
        
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});


module.exports = router;
