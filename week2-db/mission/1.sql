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
    AND book.is_available = 1 /*어차피 여기서 NULL 걸러짐*/
JOIN
    rental
ON
    rental.book_id = book.book_id
ORDER BY
    returned_at DESC
LIMIT 10;