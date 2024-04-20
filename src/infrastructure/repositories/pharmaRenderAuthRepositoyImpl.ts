import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repositories";
import { PharmaRenderAuthDatasourceImpl } from "../datasources/pharmaRenderAuthDatasourceImpl";
import { SignInParams, SignUpParams, UpdateUserParams } from "../../domain/interfaces";



export class PharmaRenderAuthRepositoyImpl implements AuthRepository {

    private datasource: AuthDataSource;

    constructor(datasource?: AuthDataSource) {
        this.datasource = datasource ?? new PharmaRenderAuthDatasourceImpl();
    }

    async signIn(signInParams: SignInParams) {
        return this.datasource.signIn(signInParams);
    }

    async signUp(signUpParams: SignUpParams) {
        return this.datasource.signUp(signUpParams);
    }

    async reNewToken() {
        return this.datasource.reNewToken();
    }

    async findUserById(id: string) {
        return this.datasource.findUserById(id);
    }

    async updateUser(id: string, updateUserParams: UpdateUserParams) {
        return this.datasource.updateUser(id, updateUserParams);
    }

    async deleteUser(id: string) {
        return this.datasource.deleteUser(id);
    }

}