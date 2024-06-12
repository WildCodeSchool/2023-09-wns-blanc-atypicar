export type UserUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date | string;
  picture: string;
  description: string;
  vehicle: {
    id: number;
    model: string;
    brand: string;
    name: string;
    seats: number;
    picture: string;
  }
}
