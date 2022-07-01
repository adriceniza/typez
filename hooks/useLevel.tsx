import IUser from "../Interfaces/IUser"

export default function useLevel(user: IUser) {
    const exp = user?.exp
    const levels = [
        300,
        600,
        1200,
        2400,
        4800,
        9600,
        13200,
        19200,
        31000,
        138000
    ]
    let response
    for (let i = 0; i < levels.length; i++) {
        if (levels[i] > exp) {
            response = {
                "level": i,
                "level_max_exp": levels[i]
            }
            break

        }
    }
    return response
}
