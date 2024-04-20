

export interface SignInParams {
    email: string;
    password: string;
}

export interface SignUpParams {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserParams {
    username?: string;
    email?: string;
}