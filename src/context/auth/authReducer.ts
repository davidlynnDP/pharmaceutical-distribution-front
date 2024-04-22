import { AuthState } from './AuthProvider';

enum AuthStatus {
    NotAuthenticated = 'not-authenticated',
    Authenticated = 'authenticated',
}

type AuthActionType =
    | { type: '[Auth] - Sign In', payload: AuthState }
    | { type: '[Auth] - Sign Up', payload: AuthState }
    | { type: '[Auth] - Renew Token', payload: AuthState }
    | { type: '[Auth] - Update User', payload: AuthState }
    | { type: '[Auth] - Delete User', payload: AuthState }
    | { type: '[Auth] - Logout' };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
        
        switch ( action.type ) {
            case '[Auth] - Sign In':
            case '[Auth] - Sign Up':
            case '[Auth] - Renew Token':
            case '[Auth] - Update User':
            case '[Auth] - Delete User':
                return {
                    ...state,
                    user: action.payload.user,
                    status: action.payload.status,
                };
    
            case '[Auth] - Logout':
                return {
                    user: {
                        id: '',
                        username: '',
                        email: '',
                        isActive: false,
                        token: '',
                    },
                    status: AuthStatus.NotAuthenticated,
                };
    
            default:
                return state;
        }
    };
