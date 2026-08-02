import type { LoginRequestDto } from "../dtos/auth/LoginRequestDto";
import type { RegisterRequestDto } from "../dtos/auth/RegisterRequestDto";
import type { User } from "../models/User";
import { EventEmitter } from "../utils/eventEmitter/eventEmitter";
import { apiService } from "./apiService";

class AuthService {

    authenticatedUser: User | null = null;
    authenticatedUserChanged = new EventEmitter();

    constructor() {
        this.getMe();
    }

    private onAuthenticatedUserChanged() {
        this.authenticatedUserChanged.emit(this.authenticatedUser);
    }

    private async getMe() {
        try {
            this.authenticatedUser = await apiService.fetch<User>("GET", "me");
        } catch (error) {
            this.authenticatedUser = null;
        } finally {
            this.onAuthenticatedUserChanged();
        }
    }

    async register(dto: RegisterRequestDto) {
        await apiService.fetch<undefined>("POST", "register", dto);
    }

    async login(dto: LoginRequestDto) {
        await apiService.fetch<undefined>("POST", "login", dto);
        await this.getMe();
    }

    async logout() {
        await apiService.fetch<undefined>("POST", "logout");
        this.authenticatedUser = null;
        this.onAuthenticatedUserChanged();
    }
}

export const authService: AuthService = new AuthService();