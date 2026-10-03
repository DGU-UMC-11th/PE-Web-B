WITH params AS (
    SELECT
        1 AS TARGET_BOOK_ID,
        1 AS TARGET_USER
),
tag_texts AS (
    SELECT
        book_tag.book_id as book_id,
        GROUP_CONCAT(tag.name) AS tags
    FROM
        book_tag
    JOIN
        tag
    ON
        book_tag.tag_id = tag.tag_id
    JOIN
        params
    ON
        params.TARGET_BOOK_ID = book_tag.book_id
    GROUP BY
        book_id
)
SELECT
    book.title,
    tag_texts.tags,
    EXISTS (
        SELECT 1
        FROM book_like
        JOIN params
        ON book_like.book_id = book.book_id
        AND params.TARGET_USER = book_like.user_id
        AND params.TARGET_BOOK_ID = book.book_id
    ) as book_like
FROM
    book
JOIN
    tag_texts
ON
    book.book_id = tag_texts.book_id;