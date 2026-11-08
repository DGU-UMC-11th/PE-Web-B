package com.umc.study.controller;

import com.umc.study.dto.BookResponse;
import com.umc.study.dto.CreateBookRequest;
import com.umc.study.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController // 1. "나는 데이터를 JSON으로 서빙하는 API 카운터야!"
@RequestMapping("/books") // 2. 이 컨트롤러로 들어오는 요청의 기본 주소는 /books
@RequiredArgsConstructor
public class BookController {

    // 주방장(Service)을 주입받아 카운터 옆에 대기 시킨다.
    private final BookService bookService;

    /*public record RentalRequest(String userId, String bookId) {}

    // 3. HTTP GET 방식으로 /books 요청이 들어왔을 때 이 메서드가 실행됩니다.
    @GetMapping
    public List<Map<String, Object>> getBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public String createBook(@RequestBody Map<String, Object> body) {
        bookService.createBook(body);
        return "도서 등록이 완료되었습니다!.";
    }

    @GetMapping("/{categoryId}")
    public List<Map<String, Object>> getBooksByCategory(@PathVariable String categoryId) {
        return bookService.getBooksByCategory(categoryId);
    }

    @PostMapping("/rentals")
    public String createRentalHistory(@RequestBody RentalRequest request) {
        bookService.createRentalHistory(request.userId, request.bookId);
        return "정상적으로 생성되었습니다!";
    }

    @PatchMapping("/rentals/{rentalId}/return")
    public String returnBook(@PathVariable String rentalId) {
        bookService.returnBook(rentalId);
        return "정상적으로 삭제되었습니다.";
    }*/

    @GetMapping
    public List<BookResponse> getBooks() {
        return bookService.getBooks();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookResponse createBook(@Valid @RequestBody CreateBookRequest request) {
        return bookService.createBook(request);
    }
}
