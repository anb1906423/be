const config = {
	jwt: {
		secret: process.env.JWT_SECRET || "suzukisite-secret-key",
	},
};

module.exports = config;
