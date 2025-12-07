function getHealth(req, res) {
	res.json({
		status: "ok",
		service: "acquapack-erp-back",
		timestamp: new Date().toISOString()
	});
}

module.exports = { getHealth };

