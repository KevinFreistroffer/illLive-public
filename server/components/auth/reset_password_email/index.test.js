const { MongoClient } = require("mongodb");
const privateConfig = require("../../../config/private_config");

describe("user exists with given email", () => {
	let connection;
	let db;

	beforeAll(async () => {
		connection = await MongoClient.connect(
			`mongodb://${privateConfig.database.username}:${privateConfig.database.password}@ds231070.mlab.com:31070/react`,
			{
				useNewUrlParser: true
			}
		);
		db = await connection.db("react");
	});

	afterAll(async () => {
		await connect.close();
		await db.close();
	});

	// The actual test
	// So this tests that the db is working.
	it("should return true if the email exists in the db", async () => {
		const users = db.collection('users');
		const mockUser = { email: 'mock@gmail.com' }

		const foundUser = await users.findOne(mockUser);
		expect(foundUser.email).toEqual(mockUser.email);
	});
});
