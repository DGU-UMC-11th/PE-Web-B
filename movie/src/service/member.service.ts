// src/service/member.service.ts
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateMemberDto } from "../dto/create-member.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MemberEntity } from "../entity/member.entity.js";
import { CheckResponseDto } from "../dto/check-response.dto.js";

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,
    ) {}

    async checkNickname(nickname: string): Promise<CheckResponseDto> {
        if (!(2 <= nickname.length && nickname.length <= 12)) {
            throw new BadRequestException("유효하지 않은 닉네임 형식");
        }

        const exists = await this.memberRepository.exists({
        where: { nickname },
        });
        return { available: !exists };
    }

    async checkEmail(email: string): Promise<CheckResponseDto> {
        const emailRegex = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;

        if (!emailRegex.test(email) || !(3 <= email.length && email.length <= 254)) {
            throw new BadRequestException("유효하지 않은 이메일 형식");
        }

        const exists = await this.memberRepository.exists({ where: { email } });
        return { available: !exists };
    }

    async signUp(dto: CreateMemberDto) {
        if (await this.memberRepository.exists({ where: { email: dto.email } })) {
            throw new ConflictException({ code: "MEMBER4091", message: "이미 사용 중인 이메일입니다." });
        }
        if (await this.memberRepository.exists({ where: { nickname: dto.nickname } })) {
            throw new ConflictException({ code: "MEMBER4092", message: "이미 사용 중인 닉네임입니다." });
        }

        const saved = await this.memberRepository.save(
            this.memberRepository.create({
                email: dto.email,
                password: await bcrypt.hash(dto.password, 10),
                nickname: dto.nickname,
            }),
        );

        return { memberId: saved.memberId, email: saved.email, nickname: saved.nickname };
    }
}