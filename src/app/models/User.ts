export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'admin';
  points: number;
}
