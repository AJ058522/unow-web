
export interface SessionData {
    id: number,
    name: string,
    last_name: string,
    image: string,
    role_id: number,
    email: string,
    telephone: string,
    rfc: string,
    address: string,
    contact_name: string,
    status: number,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
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
