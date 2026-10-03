SELECT * FROM book;
SELECT 
    book_id, title, description 
FROM 
    book 
WHERE 
    is_available = TRUE 
ORDER BY 
    book_id DESC;