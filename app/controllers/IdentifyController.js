const { dbUserPool } = require("../db/db");
const format = require("pg-format");

const identify = async (req, res) => {
	let { email, phoneNumber} = req.body;
	if (!email && !phoneNumber) {
		return res.status(400).send({
			message: "Email or phone is required",
		});
	}
	email = email+"";
	phoneNumber = phoneNumber+"";

	const fetchQuery = format(
		"SELECT * FROM contact WHERE email = %L OR phoneNumber = %L ORDER BY createdAt",
		email,
		phoneNumber
	);
	let client;
	try{
		client = await dbUserPool.connect();
		const fetchResult = await client.query(fetchQuery);
		const emails = new Set();
		const phoneNumbers = new Set();

		if(fetchResult.rows.length === 0){
			await client.query("BEGIN");
			const insertQuery = format("INSERT INTO contact(email, phoneNumber, linkPrecedence) VALUES(%L, %L, %L) RETURNING id", email, phoneNumber, "primary");
			const insertResult = await client.query(insertQuery);
			await client.query("COMMIT");
			return res.status(200).json({
				"contact":{
					"primaryContatctId": insertResult.rows[0].id,
					"emails": [email], 
					"phoneNumbers": [phoneNumber], 
					"secondaryContactIds": []
				}
			});
		} else if ((fetchResult.rows.length === 1 && fetchResult.rows[0].linkprecedence === "secondary") || email ==='null' || phoneNumber === 'null') {
			const primaryContactId = fetchResult.rows[0].linkedid || fetchResult.rows[0].id;
			const secondaryFetchQuery = format(
				"SELECT * FROM contact WHERE linkedId = %L OR id = %L ORDER BY linkprecedence, createdAt",
				primaryContactId,
				primaryContactId
			);
			const secondaryFetchResult = await client.query(secondaryFetchQuery);

			const secondaryContactIds = [];
			secondaryFetchResult.rows.forEach((contact) => {
				emails.add(contact.email);
				phoneNumbers.add(contact.phonenumber);
				if (contact.id !== primaryContactId) {
					secondaryContactIds.push(contact.id);
				}
			});
			return res.status(200).json({
				contact: {
					primaryContatctId: primaryContactId,
					emails: Array.from(emails),
					phoneNumbers: Array.from(phoneNumbers),
					secondaryContactIds: secondaryContactIds,
				},
			});
		} else if (fetchResult.rows.length === 1) {
			const primaryContactId = fetchResult.rows[0].id;
			emails.add(fetchResult.rows[0].email);
			phoneNumbers.add(fetchResult.rows[0].phonenumber);
			await client.query("BEGIN");
			const insertQuery = format(
				"INSERT INTO contact(email, phoneNumber, linkPrecedence, linkedid) VALUES(%L, %L, %L, %L) RETURNING id",
				email,
				phoneNumber,
				"secondary",
				primaryContactId
			);
			const insertResult = await client.query(insertQuery);
			await client.query("COMMIT");
			emails.add(email);
			phoneNumbers.add(phoneNumber);
			return res.status(200).json({
				contact: {
					primaryContatctId: primaryContactId,
					emails: Array.from(emails),
					phoneNumbers: Array.from(phoneNumbers),
					secondaryContactIds: [insertResult.rows[0].id],
				},
			});
		} else if (fetchResult.rows.length > 1){
			await client.query("BEGIN");
			const primaryContactId = fetchResult.rows[0].id;
			const secondaryContactIds = fetchResult.rows
				.slice(1)
				.map((contact) => contact.id);
			fetchResult.rows.forEach((contact) => {
				emails.add(contact.email);
				phoneNumbers.add(contact.phonenumber);
			});
			const updateQuery = format(
				"UPDATE contact SET linkPrecedence = %L, linkedid = %L WHERE id = %L",
				"secondary",
				primaryContactId,
				secondaryContactIds.join(",")
			);
			await client.query(updateQuery);
			await client.query("COMMIT");
			return res.status(200).json({
				contact: {
					primaryContatctId: primaryContactId,
					emails: Array.from(emails),
					phoneNumbers: Array.from(phoneNumbers),
					secondaryContactIds: secondaryContactIds,
				},
			});
		}
	} catch (error) {
		await client.query("ROLLBACK");
        return res.status(500).json({
			message: "Database error occurred, Try again later.",
			error: error.message,
		});
	} finally{
		await client.release();
	}
};

const clear = async (req, res) => {
	let client;
	try {
		client = await dbUserPool.connect();
		await client.query("BEGIN");
		await client.query("DELETE FROM contact where 1=1;");
		await client.query("COMMIT");
		return res.status(200).json({
			message: "All contacts have been cleared",
		});
	} catch (error) {
		await client.query("ROLLBACK");
		return res.status(500).json({
			message: "Database error occurred, Try again later.",
			error: error.message,
		});
	} finally {
		client.release();
	}
};

module.exports = {
	identify,
	clear
};
