SELECT p.*, u.username, u.profile_pic
FROM users u
JOIN posts p ON u.id = p.author_id
WHERE CASE WHEN $1 = false then u.id != $2 ELSE true END
AND LOWER(p.title) LIKE LOWER('%' || $3 || '%');