export default function asciiGameRecord(record: {
    WPMAverage: number;
    expEarned: number;
    gameId: string;
    id: string;
    timestamp: string;
    userId: string;

}) {
    let title = "Last record";
    let WPMAverage = "Wpm: " + record.WPMAverage.toString();
    let expEarned = "Exp: " + record.expEarned.toString();
    let gameId = "Mode: " + record.gameId;
    let timeStamp_to_date = new Date(record.timestamp);
    let timeStamp_to_date_string = "Date: " + timeStamp_to_date.toLocaleDateString();
    let maxString = title.length > timeStamp_to_date_string.length ? title.length : timeStamp_to_date_string.length;
    let containerWidth = "~~~~~~~~~~~~~~~~";
    for (let i = 0; i < maxString; i++) {
        containerWidth += "~";
    }
    title = title.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - title.length) / 2))}${title}${containerWidth.substring(0, ((containerWidth.length - title.length) / 2))}` : title;
    timeStamp_to_date_string = timeStamp_to_date_string.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - timeStamp_to_date_string.length) / 2))}${timeStamp_to_date_string}${containerWidth.substring(0, ((containerWidth.length - timeStamp_to_date_string.length) / 2))}` : timeStamp_to_date_string;
    WPMAverage = WPMAverage.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - WPMAverage.length) / 2))}${WPMAverage}${containerWidth.substring(0, ((containerWidth.length - WPMAverage.length) / 2))}` : WPMAverage;
    expEarned = expEarned.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - expEarned.length) / 2))}${expEarned}${containerWidth.substring(0, ((containerWidth.length - expEarned.length) / 2))}` : expEarned;
    gameId = gameId.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - gameId.length) / 2))}${gameId}${containerWidth.substring(0, ((containerWidth.length - gameId.length) / 2))}` : gameId;
    return [
        containerWidth,
        title,
        gameId,
        WPMAverage,
        expEarned,
        timeStamp_to_date_string,
        containerWidth,
    ]
}
