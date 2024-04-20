import { useContext, useState } from 'react';
import { AuthContext } from '../context';
import { SignInParams, SignUpParams, UpdateUserParams } from '../domain/interfaces';


export const useCheckAuth = () => {

    const { 
      status, 
      user, 
      deleteUser, 
      findUserById, 
      logout, 
      reNewToken, 
      signIn, 
      signUp, 
      updateUser } = useContext( AuthContext );

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleSignIn = async(signInParams: SignInParams) => {
        setIsLoading(true);
        await signIn(signInParams);
        setIsLoading(false);
    };

    const handleSignUp = async(signUpParams: SignUpParams) => {
        setIsLoading(true);
        await signUp(signUpParams);
        setIsLoading(false);
    };

    const handleReNewToken = async() => {
        setIsLoading(true);
        await reNewToken();
        setIsLoading(false);
    };

    const handleFindUserById = async(id: string) => {
        setIsLoading(true);
        await findUserById(id);
        setIsLoading(false);
    };

    const handleUpdateUser = async(id: string, updateUserParams: UpdateUserParams) => {
        setIsLoading(true);
        await updateUser(id, updateUserParams);
        setIsLoading(false);
    };

    const handleDeleteUser = async(id: string) => {
        setIsLoading(true);
        await deleteUser(id);
        setIsLoading(false);
    };

    const handleLogout = () => {
        setIsLoading(true);
        logout();
        setIsLoading(false);
    };

    return {
        status,
        user,
        isLoading,
        handleSignIn,
        handleSignUp,
        handleReNewToken,
        handleFindUserById,
        handleUpdateUser,
        handleDeleteUser,
        handleLogout
    };
};