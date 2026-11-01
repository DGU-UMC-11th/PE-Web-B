package com.umc.study.repository;

import com.umc.study.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByOrderByBookIdDesc();
}

// BookRepository는 Book 엔티티를 관리하는 Repository이며, 기본키 타입은 Long이다. JpaRepository가 제공하는 기본 CRUD 기능을 사용하고, 추가로 모든 책을 bookId 내림차순으로 조회하는 기능을 제공한다.