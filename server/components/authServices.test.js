describe('createConfirmationToken function', async () => {

	const mockCreateToken = jest.fn(email => {
		return; 
	});


	// it('should accept one parameter', async () => {
	// 	expect(mockCreateToken.mock.calls[0)
	// });

	it('should require a defined parameter', async () => {
		expect(mockCreateToken.mock.calls[0][0].toBeDefined());''
	})

	it('should return a false value', async () => {
		expect(mockCreateToken.mockReturnValueOnce(false));
	})

});