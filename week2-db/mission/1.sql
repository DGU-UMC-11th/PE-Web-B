SELECT * FROM book;
SELECT * FROM category;
SELECT * FROM rental;
SELECT
    book.title,
    book.description,
    category.name
FROM
    book
JOIN
    category
ON
    category.category_id = book.category_id
    AND category.name = "문학"
    AND book.is_available = 1
LEFT JOIN
    rental
ON
    rental.book_id = book.book_id
ORDER BY
    /*rental.returned_at DESC NULLS FIRST mariaDB에서는 NULLS FIRST 없음*/
    rental.returned_at IS NULL DESC, /*그래서 NULL 기준으로 정렬(1, 0) 하고 그 후 정렬*/
    rental.returned_at DESC
LIMIT 10;