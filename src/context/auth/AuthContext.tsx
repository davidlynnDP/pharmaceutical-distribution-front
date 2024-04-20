import { createContext } from 'react';
import { SignInParams, SignUpParams, UpdateUserParams } from "../../domain/interfaces";
import { User } from '../../domain/models';


enum AuthStatus {
    Checking = 'checking',
    NotAuthenticated = 'not-authenticated',
    Authenticated = 'authenticated',
}

interface AuthContextProps {
    user: User;
    status: AuthStatus;

    signIn: (signInParams: SignInParams) => Promise<void>;
    signUp: (signUpParams: SignUpParams) => Promise<void>;
    reNewToken: () => Promise<void>;
    findUserById: (id: string) => Promise<User | undefined>;
    updateUser: (id: string, updateUserParams: UpdateUserParams) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    logout: () => void;
}


export const AuthContext = createContext({} as AuthContextProps);