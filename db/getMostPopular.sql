select beername, beerdesc 
from favorites
group by beername, beerdesc
order by count(*) desc
limit 1