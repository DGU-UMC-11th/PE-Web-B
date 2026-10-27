import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseTimeEntity } from "./base-time.entity.js";
import { MemberEntity } from "./member.entity.js";

@Entity("rating")
export class RatingEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: "rating_id" })
  ratingId: number;

  @ManyToOne(() => MemberEntity, { nullable: false })
  @JoinColumn({ name: "member_id" })
  member: MemberEntity;

  @Column({ name: "movie_id" })
  movieId: number;

  @Column()
  score: number;

  @Column({ type: "text", nullable: true })
  comment: string | null;
}