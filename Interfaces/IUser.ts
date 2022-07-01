export default interface IUserSession {
  email: string;
  emailVerified: boolean | null;
  id: string;
  image: string;
  exp: number;
  username: string;
  name: string;
  createdAt: string;
}
