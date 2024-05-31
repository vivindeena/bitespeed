const identify = async (req, res) => {
	const { email, phone } = req.body;
	if (!email || !phone) {
		return res.status(400).send({
			message: "Email or phone is required",
		});
	}
};

module.exports = {
	identify,
};
