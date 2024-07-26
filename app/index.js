const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db/db");
const identify = require("./routes/identify");

require("appdynamics").profile({
	controllerHostName: 'bruce202407230400459.saas.appdynamics.com',
	controllerPort: 80,
	  accountName: 'bruce202407230400459',
	accountAccessKey: 'z5kg87qi6t1j',
	applicationName: 'node-app',
	tierName: 'backend',
	nodeName: 'process' // The controller will automatically append the node name with a unique number
   });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) =>{
	res.status(200).json({
		message: "Welcome to the backend",
	});
})


app.get("/check", async (req, res) => {
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
	console.log(`Listening on port ${process.env.PORT||3000}`);
});
