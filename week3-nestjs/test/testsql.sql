SELECT * FROM book;
DELETE FROM book WHERE book_id = 4;

SELECT * FROM book WHERE category_id = 1;

SELECT * FROM rental;

UPDATE rental SET returned_at = NOW() WHERE rental_id = 2;