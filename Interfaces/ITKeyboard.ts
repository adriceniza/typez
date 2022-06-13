export default interface ITKeyboard {
  fakeSearch?: string;
  setFakeSearch?: React.Dispatch<React.SetStateAction<string>>;
  position?: string;
  hidden?: boolean;
  opacity?: number;
  onEnter?: (e: string) => void;
}
