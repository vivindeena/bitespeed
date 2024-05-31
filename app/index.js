const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
