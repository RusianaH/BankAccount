const { Test } = require('supertest')
const base = require('../controller/user.controller.js')
const mockRequest = (body = {}) => ({body})
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res

}

describe('testing base for base controller', ()=> {
    test(`user testing`, done => {
        const req = mockRequest()
        const resp = mockResponse()
        base.Insert(req, resp)
        expect(resp.status).toBeCalledWith(200)
        expect(resp.json).toBeCalledWith({
            status: true,
            message:"hellow world"
        })
        done()
    }) 
})

describe('CreateUser Function', () => {
    it('should return an error response if a user with the same email already exists', async () => {
        // Prepare a test request and response object
        const req = {
            body: {
                name: 'nurul Azizah ',
                email: 'nurul@gmail.com',
                password: 'nurul123',
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Call the CreateUser function
        await CreateUser(req, res);

        // Assert that the response is as expected
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'User already exists with the same email',
            error: null,
            status: 400,
        });
    });
});






