export default interface IGameRecord {
  id?: String;
  userId: String;
  gameId: String;
  WPMAverage: number;
  expEarned: number;
  timestamp?: Date;
}
