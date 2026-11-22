import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseTimeEntity } from "./base-time.entity.js";
import { MemberEntity } from "./member.entity.js";

@Entity("favorite")
@Unique("uk_favorite_member_movie", ["member", "movieId"])
export class FavoriteEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: "favorite_id" })
  favoriteId: number;

  // 즐겨찾기의 주인은 로그인한 회원
  @ManyToOne(() => MemberEntity, { nullable: false })
  @JoinColumn({ name: "member_id" })
  member: MemberEntity;

  // TMDB 영화 ID. 우리 DB에 movie 테이블이 없으므로 FK 아님
  @Column({ name: "movie_id" })
  movieId: number;
}
