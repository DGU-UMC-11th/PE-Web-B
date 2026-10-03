SELECT * FROM users;
SELECT * FROM book;
SELECT * FROM rental;

SELECT
    book.title,
    rental.rented_at,
    rental.due_at
FROM
    rental
JOIN
    users
ON
    rental.user_id = users.user_id
    AND returned_at IS NULL
    AND users.nickname = "민서" /*id로 처리하는 게 좋을 듯*/
JOIN
    book
ON
    rental.book_id = book.book_id
ORDER BY
    rental.due_at;