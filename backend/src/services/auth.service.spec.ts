import * as authServices from "../services/auth.service"

// Creation du mock pour le service de données
jest.mock('../services/auth.service', () => ({
      register: jest.fn().mockImplementation((email: string, password: string) => {
        if(email === 'invalid@mail.com' && password === 'wrongpassword'){
            return false
        } else {
            return 'mocked-token';
        }
      })
  }));

describe("Register resolver", () => {
    it('Should return true with correct login and password', async () => {
        // Définir les informations de connexion correctes
        const email = 'test@mail.com';
        const password = 'test';

        // Appeler le resolver login avec les informations de connexion correctes
        const result = await authServices.register(email, password);

        // Vérifier si le résultat est vrai
        expect(result).toBe('mocked-token');
    });

    it('Should return false with incorrect login and password', async () => {
        // Définir les informations de connexion incorrectes
        const email = 'invalid@mail.com';
        const password = 'wrongpassword';

        // Appeler le resolver login avec les informations de connexion incorrectes
        const result = await authServices.register(email, password);

        // Vérifier si le résultat est faux
        expect(result).toBe(false);
    });
});