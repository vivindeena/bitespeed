const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db/db");
const identify = require("./routes/identify");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
	let client;
	try {
		client = await db.dbUserPool.connect();
		res.status(200).json({
			data: "Route is reachable, Check documentation for more info",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Database connection failed",
			error: error,
		});
	} finally {
		client.release();
	}
});
app.use("/identify", identify);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
