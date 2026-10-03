SELECT * FROM book;
SELECT * FROM category;
-- SELECT b.book_id, b.title, c.name AS category_name FROM book  AS b JOIN category AS c ON b.category_id = c.category_id WHERE c.name = '문학' AND b.is_available = TRUE ORDER BY b.book_id DESC LIMIT 10;
SELECT
    b.book_id,
    b.title,
    c.name
FROM
    book AS b
JOIN
    category as c
ON
    b.category_id = c.category_id
    AND c.name = "문학"
    AND b.is_available = TRUE
ORDER BY
    b.book_id DESC
LIMIT 
    10;