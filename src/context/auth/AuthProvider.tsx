import { FC, ReactNode, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { SignInParams, SignUpParams, UpdateUserParams } from '../../domain/interfaces';
import { authReducer } from './authReducer';
import { AuthRepository } from '../../domain/repositories';
import { PharmaRenderAuthRepositoyImpl } from '../../infrastructure/repositories/pharmaRenderAuthRepositoyImpl';
import { User } from '../../domain/models';

enum AuthStatus {
    NotAuthenticated = 'not-authenticated',
    Authenticated = 'authenticated',
}

export interface AuthState {
    user: User;
    status: AuthStatus;
}

const AUTH_INITIAL_STATE: AuthState = {
    user: {
        id: '',
        username: '',
        email: '',
        isActive: false,
        token: ''
    },
    status: AuthStatus.NotAuthenticated,
};



interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthLayoutProps> = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const authRepository: AuthRepository = new PharmaRenderAuthRepositoyImpl();

    const signIn = async(signInParams: SignInParams) => {
        try {
            const user = await authRepository.signIn( signInParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Sign In', payload });
        } catch ( error ) {
            console.log( error );
        }
    };

    const signUp = async(signUpParams: SignUpParams) => {
        try {
            const user = await authRepository.signUp( signUpParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Sign Up', payload });
        } catch ( error ) {
            console.log( error );
        }
    };

    const reNewToken = async() => {
        try {
            const user = await authRepository.reNewToken();
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Renew Token', payload });
        } catch ( error ) {
            console.log( error );
        }
    };

    const findUserById = async(id: string) => {
        try {
            return await authRepository.findUserById( id );
        } catch ( error ) {
            console.log( error );
        }
    };

    const updateUser = async(id: string, updateUserParams: UpdateUserParams) => {
        try {
            const user = await authRepository.updateUser( id, updateUserParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Update User', payload });
        } catch ( error ) {
            console.log( error );
        }
    };

    const deleteUser = async(id: string) => {
        try {
            const user = await authRepository.deleteUser( id );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Delete User', payload });
        } catch ( error ) {
            console.log( error );
        }
    };

    const logout = () => {
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('token');
        localStorage.removeItem('tokenIssuedAt');
    };

    return (
        <AuthContext.Provider value={{
            ...state,

            signIn,
            signUp,
            reNewToken,
            findUserById,
            updateUser,
            deleteUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}