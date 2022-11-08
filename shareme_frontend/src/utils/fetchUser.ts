import { DecodedCredentials } from "../types/googleAuthInterfaces";

export const fetchUser = () => {
    const userInfo: DecodedCredentials = JSON.parse(localStorage.getItem('user')!)

    return userInfo;
}