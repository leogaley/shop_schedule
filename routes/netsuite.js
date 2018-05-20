const router = require("express").Router();
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const netsuiteController = require("../controllers/oauth.js");


// Matches with "/netsuite"
router
  .route("/")
  .get(netsuiteController.getAll)

// Matches with "/netsuite/:id"
router
  .route("/:id")
  .get(netsuiteController.getDept)
  // .put(netsuiteController.update)

module.exports = router;