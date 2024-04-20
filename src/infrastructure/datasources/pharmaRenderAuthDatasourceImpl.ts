import { pharmaApi } from "../../config/api";
import { getDateTimeNow } from "../../config/helpers";
import { AuthDataSource } from "../../domain/datasources";
import { SignInParams, SignUpParams, UpdateUserParams } from "../../domain/interfaces";
import { User } from "../../domain/models";


const dateTimeNow: string = getDateTimeNow();


export class PharmaRenderAuthDatasourceImpl implements AuthDataSource {

    async signIn({ email, password }: SignInParams): Promise<User> {
        try {
            const response = await pharmaApi.post<User>('/auth/login', {
                email: email,
                password: password
            });

            localStorage.setItem('token', response.data.token );
            localStorage.setItem('tokenIssuedAt', dateTimeNow );

            console.log( response );
            
            return response.data as User;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async signUp({ username, email, password }: SignUpParams): Promise<User> {

        try {
            const response = await pharmaApi.post<User>('/auth/register', {
                username: username,
                email: email,
                password: password
            });

            localStorage.setItem('token', response.data.token );
            localStorage.setItem('tokenIssuedAt', dateTimeNow );

            console.log( response );

            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async reNewToken(): Promise<User> {
        try {
            const response = await pharmaApi.get<User>('/auth/check-auth-status');

            localStorage.setItem('token', response.data.token );
            localStorage.setItem('tokenIssuedAt', dateTimeNow );

            console.log( response );

            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async findUserById( id: string ): Promise<User> {
        try {
            const response = await pharmaApi.get<User>(`/auth/find/${ id }`);

            console.log( response );

            return response.data;
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async updateUser( id: string, { email, username }: UpdateUserParams): Promise<User> {
        try {
            const response = await pharmaApi.patch<User>(`/auth/${ id }`, {
                username: username,
                email: email,
            });

            console.log( response );

            return response.data
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

    async deleteUser( id: string ): Promise<User> {
        try {
            const response = await pharmaApi.delete<User>(`/auth/${ id }`);

            console.log( response );

            return response.data
        } catch ( error ) {
            console.log(error);
            throw error;
        }
    }

}