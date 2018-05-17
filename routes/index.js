const path = require("path");
const router = require("express").Router();
const netsuiteRoutes = require("./netsuite");


// Netsuite Routes
router.use("/netsuite", netsuiteRoutes);


module.exports = router;