import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ length: 64, nullable: false })
	name!: string;

	@Column({
		type: "timestamp with time zone",
		default: () => "CURRENT_TIMESTAMP",
		nullable: false,
	})
	created?: string;

	@Column({ length: 256, nullable: false })
	password!: string;

	@Column({ length: 128, nullable: false })
	email!: string;

	@Column({ default: false })
	email_confirmed?: boolean;
}
