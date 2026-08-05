import type { LoginRequestDto } from "../dtos/auth/LoginRequestDto";
import type { RegisterRequestDto } from "../dtos/auth/RegisterRequestDto";
import type { User } from "../models/User";
import { EventEmitter } from "../utils/eventEmitter/eventEmitter";
import { apiService } from "./apiService";

class AuthService {

    private readonly sub = "auth";

    authenticatedUser: User | null = null;
    authenticatedUserChanged = new EventEmitter<User | null>(null);
    
    constructor() {
        this.getMe();
    }
    
    isAuthenticated() {
        return this.authenticatedUser !== null 
    };
    
    private onAuthenticatedUserChanged() {
        this.authenticatedUserChanged.emit(this.authenticatedUser);
    }

    async getAll() {
        return await apiService.fetch<User[]>("GET", `${this.sub}/`);
    }

    private async getMe() {
        try {
            this.authenticatedUser = (await apiService.fetch<User>("GET", `${this.sub}/me`))!;
        } catch (error) {
            this.authenticatedUser = null;
        } finally {
            this.onAuthenticatedUserChanged();
        }
    }

    async register(dto: RegisterRequestDto) {
        await apiService.fetch<undefined>("POST", `${this.sub}/register`, dto);
    }

    async login(dto: LoginRequestDto) {
        await apiService.fetch<undefined>("POST", `${this.sub}/login`, dto);
        await this.getMe();
    }

    async logout() {
        try {
            await apiService.fetch<undefined>("POST", `${this.sub}/logout`);
        } catch (error) {

        } finally {
            this.authenticatedUser = null;
            this.onAuthenticatedUserChanged();
        }
    }
}

export const authService: AuthService = new AuthService();