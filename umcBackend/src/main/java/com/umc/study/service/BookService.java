package com.umc.study.service;

import com.umc.study.dto.BookResponse;
import com.umc.study.dto.CreateBookRequest;
import com.umc.study.entity.Book;
import com.umc.study.entity.Category;
import com.umc.study.repository.BookRepository;
import com.umc.study.repository.BookRepositoryC;
import com.umc.study.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service // 비즈니스 로직을 수행하는 메인 셰프 계층
@RequiredArgsConstructor
public class BookService {

    // 창고지기(Repository)를 생성자 주입으로 데려온다.
    private final BookRepository bookRepository;
    private final BookRepositoryC bookRepositoryC;
    private final CategoryRepository categoryRepository;

    /*public List<Map<String, Object>> getAllBooks() {
        // 지금은 별도 가공 없이 창고지기가 가져온 도서 목록을 그대로 반환한다.
        return bookRepository.findAll();
    }

    public void createBook(Map<String, Object> body) {
        bookRepository.save(body);
    }

    public List<Map<String, Object>> getBooksByCategory(String categoryId) {
        return bookRepository.findByCategory(categoryId);
    }

    public void createRentalHistory(String userId, String bookId) {
        bookRepository.saveRentalHistory(userId, bookId);
    }

    public void returnBook(String rentalId) {
        bookRepository.returnRentalBook(rentalId);
    }*/

    @Transactional(readOnly = true)
    public List<BookResponse> getBooks() {
        return bookRepositoryC.findAllByOrderByBookIdDesc().stream()
                .map(BookResponse::from)
                .toList();
    }

    @Transactional
    public BookResponse createBook(CreateBookRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다"));

        Book book = new Book(category, request.title(), request.description());
        return BookResponse.from(bookRepositoryC.save(book));
    }
}
