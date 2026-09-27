SELECT * FROM book;
SELECT * FROM rental;
-- book의 book_id와 rental의 book_id 엮기
-- rental의 due_at 오름차순

SELECT
    b.title, r.rented_at, r.due_at
FROM
    book as b
JOIN
    rental as r
ON
    b.book_id = r.book_id
    AND returned_at IS NOT NULL
    AND user_id = 2 /*현재 로그인한 유저의 아이디*/
ORDER BY
    r.due_at ASC;