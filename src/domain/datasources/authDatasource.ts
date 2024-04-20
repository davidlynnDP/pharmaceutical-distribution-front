import { SignInParams, SignUpParams, UpdateUserParams } from "../interfaces";
import { User } from "../models";



export interface AuthDataSource {

    signIn(signInParams: SignInParams): Promise<User>;
    signUp(signUpParams: SignUpParams): Promise<User>;
    reNewToken(): Promise<User>;
    findUserById(id: string): Promise<User>;
    updateUser(id: string, updateUserParams: UpdateUserParams): Promise<User>;
    deleteUser(id: string): Promise<User>;
    
}
