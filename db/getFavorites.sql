SELECT *
FROM favorites 
JOIN users  ON favorites.userid = users.id
WHERE users.id = $1;