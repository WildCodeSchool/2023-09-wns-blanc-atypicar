import { CreateUserType } from "../types/CreateUserType";
import * as userServices from "../services/user.service"

jest.mock('../services/user.service', () => ({
    createUser: jest.fn().mockImplementation(() => {
        return 'mocked-user';
    })
}));

describe("User resolver", () => {
    it('Should create a new user', async () => {
        const newUser: CreateUserType = {
            firstName: "John",
            lastName: "Doe",
            birthday: new Date,
            email: 'test@email.com',
            password: '123456',
            role: "USER",
            creationDate: new Date,
            verifiedLicense: false,
            verifiedEmail: false,
            picture: "test",
            description: "test"
          };

        const result = await userServices.createUser(newUser);

        expect(result).toBe('mocked-user');
    })
})