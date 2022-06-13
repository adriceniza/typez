export interface ITest {
  testEventListener: (e: { key: string }) => Promise<void>;
}
