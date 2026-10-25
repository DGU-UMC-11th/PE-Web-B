//entities.ts

import {
    Entity,
    Column,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    type Relation,
} from 'typeorm';
  
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'user_id', type: 'bigint' })
    userId!: string;
  
    @Column({ type: 'varchar', length: 30 })
    nickname!: string;
  
    @OneToMany(() => RentalEntity, (rental) => rental.user)
    rentals!: Relation<RentalEntity[]>;
  
    @OneToMany(() => BookLikeEntity, (bookLike) => bookLike.user)
    bookLikes!: Relation<BookLikeEntity[]>;
  
    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications!: Relation<NotificationEntity[]>;
}
  
@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'category_id', type: 'bigint' })
    categoryId!: string;
  
    @Column({ type: 'varchar', length: 50 })
    name!: string;
  
    @OneToMany(() => BookEntity, (book) => book.category)
    books!: Relation<BookEntity[]>;
}
  
@Entity('book')
export class BookEntity {
    @PrimaryGeneratedColumn({ name: 'book_id', type: 'bigint' })
    bookId!: string;
  
    @Column({ name: 'category_id', type: 'bigint' })
    categoryId!: string;
  
    @Column({ type: 'varchar', length: 100 })
    title!: string;
  
    @Column({ type: 'text', nullable: true })
    description!: string | null;
  
    @Column({ name: 'is_available', type: 'boolean', default: true })
    isAvailable!: boolean;
  
    @ManyToOne(() => CategoryEntity, (category) => category.books, {
        nullable: false,
    })
    @JoinColumn({ name: 'category_id', referencedColumnName: 'categoryId' })
    category!: Relation<CategoryEntity>;
  
    @OneToMany(() => RentalEntity, (rental) => rental.book)
    rentals!: Relation<RentalEntity[]>;
  
    @OneToMany(() => BookTagEntity, (bookTag) => bookTag.book)
    bookTags!: Relation<BookTagEntity[]>;
  
    @OneToMany(() => BookLikeEntity, (bookLike) => bookLike.book)
    bookLikes!: Relation<BookLikeEntity[]>;
}
  
@Entity('rental')
export class RentalEntity {
    @PrimaryGeneratedColumn({ name: 'rental_id', type: 'bigint' })
    rentalId!: string;
  
    @Column({ name: 'user_id', type: 'bigint' })
    userId!: string;
  
    @Column({ name: 'book_id', type: 'bigint' })
    bookId!: string;
  
    @Column({ name: 'rented_at', type: 'datetime' })
    rentedAt!: Date;
  
    @Column({ name: 'due_at', type: 'datetime' })
    dueAt!: Date;
  
    @Column({ name: 'returned_at', type: 'datetime', nullable: true })
    returnedAt!: Date | null;
  
    @ManyToOne(() => UserEntity, (user) => user.rentals, {
      nullable: false,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    user!: Relation<UserEntity>;
  
    @ManyToOne(() => BookEntity, (book) => book.rentals, {
      nullable: false,
    })
    @JoinColumn({ name: 'book_id', referencedColumnName: 'bookId' })
    book!: Relation<BookEntity>;
}
  
@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn({ name: 'tag_id', type: 'bigint' })
    tagId!: string;
  
    @Column({ type: 'varchar', length: 30 })
    name!: string;
  
    @OneToMany(() => BookTagEntity, (bookTag) => bookTag.tag)
    bookTags!: Relation<BookTagEntity[]>;
}
  
@Entity('book_tag')
export class BookTagEntity {
    @PrimaryColumn({ name: 'book_id', type: 'bigint' })
    bookId!: string;
  
    @PrimaryColumn({ name: 'tag_id', type: 'bigint' })
    tagId!: string;
  
    @ManyToOne(() => BookEntity, (book) => book.bookTags, {
      nullable: false,
    })
    @JoinColumn({ name: 'book_id', referencedColumnName: 'bookId' })
    book!: Relation<BookEntity>;
  
    @ManyToOne(() => TagEntity, (tag) => tag.bookTags, {
      nullable: false,
    })
    @JoinColumn({ name: 'tag_id', referencedColumnName: 'tagId' })
    tag!: Relation<TagEntity>;
}

@Entity('book_like')
export class BookLikeEntity {
    @PrimaryColumn({ name: 'user_id', type: 'bigint' })
    userId!: string;
  
    @PrimaryColumn({ name: 'book_id', type: 'bigint' })
    bookId!: string;
  
    @ManyToOne(() => UserEntity, (user) => user.bookLikes, {
      nullable: false,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    user!: Relation<UserEntity>;
  
    @ManyToOne(() => BookEntity, (book) => book.bookLikes, {
      nullable: false,
    })
    @JoinColumn({ name: 'book_id', referencedColumnName: 'bookId' })
    book!: Relation<BookEntity>;
}

@Entity('notification')
export class NotificationEntity {
    @PrimaryGeneratedColumn({
      name: 'notification_id',
      type: 'bigint',
    })
    notificationId!: string;
  
    @Column({ name: 'user_id', type: 'bigint' })
    userId!: string;
  
    @Column({ type: 'varchar', length: 30 })
    type!: string;
  
    @ManyToOne(() => UserEntity, (user) => user.notifications, {
      nullable: false,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    user!: Relation<UserEntity>;
}