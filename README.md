#Favorite Beer

favbeer.com is a mock e-commerce app utilizing third party API

#Features

Thousands of beer brands and breweries accessible through brewery.db API
Users are able to add items to favorites for future reference 
Users are able to complete a (mock) secure shopping cart checkout via Stripe API 
Auth0 API is used to securely handle login
Mobile responsive views for all screen sizes

#Usage

Signing up with www.favbeer.com
To sign up, visit favbeer.com and click the Login button. You will be redirected to Auth0 to login using facebook, google or github accounts. After successfully logging in, you will be redirected to your www.favbeer.com dashboard

###Browsing and Search
From Random page, users are able to utilize search feature by typing in the search bar and clicking Search. If the search term returns no match, the page is reset to default view. No login is required for browsing. 
Users are able to click on the images to bring up detailed inormation about every item including description and brewery information. Logged in users are able to favorite an ditem by clicking "Like" button. 

###Favorites and Cart
Users must be logged to access Favorites and Cart pages. Users also must be logged in in order to add items to Favorites. To add items to Cart, users navigate to  Favorites page and click on any item they wish to purchase, then select 'Add to cart'. 



#Development

###Front-End technologies:
React
Bulma 

###Backend technologies: 
Node
Express

###Database:
SQL

###REST API:
brewery.db
Stripe
Auth0

