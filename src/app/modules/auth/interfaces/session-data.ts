
export interface SessionData {
    id: number,
    name: string,
    last_name: string,
    email: string,
    job: string,
    rfc: string,
    birthday: string,
    estatus: boolean,
    token: {
        accessToken: string,
        token: {
            id: string,
            user_id: number,
            client_id: string,
            name: string,
            scopes: Array<any>,
            revoked: boolean,
            created_at: string,
            updated_at: string,
            expires_at: string
        }
    }
}
