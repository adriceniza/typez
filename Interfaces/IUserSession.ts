export default interface IUserSession {
  email: string;
  emailVerified: boolean | null;
  id: string;
  image: string;
  level: number;
  name: string;
}
