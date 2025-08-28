import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(userData: { email: string; password: string; name: string }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await this.usersService.create({
            email: userData.email,
            firstName: userData.name, 
            password: hashedPassword, });
        const { password, ...result } = newUser;
        return result;
        }
    }