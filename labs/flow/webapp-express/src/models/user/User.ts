import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

import { UserValidationGroup } from "../index";

@Entity()
export class User {
	// TODO: not number - issues with JS bignumbers
	@PrimaryGeneratedColumn()
	id!: number;

	@Length(4, 64, { groups: [UserValidationGroup.SingIn, UserValidationGroup.SignUp] })
	@Column({ length: 64, nullable: false })
	name!: string;

	@Length(6, 256, { groups: [UserValidationGroup.SingIn, UserValidationGroup.SignUp] })
	// 64- because of sha256 for now
	@Column({ length: 64, nullable: false })
	password!: string;

	// TODO: PasswordConfirm - without db column

	// TODO: is duplication needed? of groups
	@IsEmail(undefined, { groups: [UserValidationGroup.SignUp] })
	@Length(0, 128, { groups: [UserValidationGroup.SignUp] })
	@Column({ length: 128, nullable: false })
	email!: string;

	@Column({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		nullable: false,
	})
	created!: string;

	@Column({ default: false })
	email_confirmed?: boolean;
}
