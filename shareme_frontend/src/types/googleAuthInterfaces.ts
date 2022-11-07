export interface GoogleResponse {
    clientId: string,
    credential: string,
    select_by: string
}

export interface DecodedCredentials {
    aud: string,
    azp: string,
    email: string,
    email_verified: boolean,
    exp: number,
    given_name: string,
    iat: number,
    iss: string,
    jti: string,
    name: string,
    nbf: number,
    picture: string,
    sub: string
}