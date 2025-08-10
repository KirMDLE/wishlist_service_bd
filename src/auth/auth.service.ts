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

    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.usersService.findOneByUsername(username);
    //     if (user && await bcrypt.compare(pass, user.password)) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     throw new UnauthorizedException('Invalid credentials');
    // }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(userData: { email: string; password: string; name: string }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.create({ username, password: hashedPassword });
        const { password, ...result } = newUser;
        return result;
        }
    }