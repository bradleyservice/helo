SELECT p.*, u.username, u.profile_pic
FROM users u
JOIN posts p ON u.id = p.author_id
WHERE p.author_id = $1;