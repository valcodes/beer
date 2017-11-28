SELECT *
FROM shoppingcart
JOIN users  ON shoppingcart.userid = users.id
WHERE users.id = $1;