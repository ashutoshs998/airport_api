# alaska airport api node js

## start: 

```
npm install 
npm run build
npm start
```

#### to import postman collection: 
import following file in postman

```airport.postman_collection.json```

## routes:

## 1. register user:

### route: 
https://afternoon-harbor-76464.herokuapp.com/register?username=ashutosh&password=123

### type:
POST


## 2. login user :

### route: 
https://afternoon-harbor-76464.herokuapp.com/login?username=ashutosh&password=123

### type:
POST



## 3. all airports list :

### route: 
https://afternoon-harbor-76464.herokuapp.com/all_airports_list


### type:
GET

### headers: 
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZjZmYmZjYjMyYzNjNjQyYzU0MDQ5MCIsImlhdCI6MTUwOTM1ODYwOX0.3dpd514hL2vemE7EVFl7BKfhJbJzhW4ZHdCSztObvU0



## 4. distance between two airports :

### route: 
https://afternoon-harbor-76464.herokuapp.com/find_distance?airport_location_one='Z59&airport_location_two='ADK

### type:
GET

### headers: 
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZjZmYmZjYjMyYzNjNjQyYzU0MDQ5MCIsImlhdCI6MTUwOTM1ODYwOX0.3dpd514hL2vemE7EVFl7BKfhJbJzhW4ZHdCSztObvU0



## 5. nearest three airports :

### route: 
https://afternoon-harbor-76464.herokuapp.com/three_nearest_airports?fecility_name=ADAK

### type:
GET

### headers: 
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZjZmYmZjYjMyYzNjNjQyYzU0MDQ5MCIsImlhdCI6MTUwOTM1ODYwOX0.3dpd514hL2vemE7EVFl7BKfhJbJzhW4ZHdCSztObvU0



# deployment on heroku:


#### Install heroku and signup on heroku official site.
#### heroku login email: ashutosh_m@excellencetechnologies.in

##### commands: 

```
heroku login
git clone https://github.com/nodeexcel/airport_api.git 
cd airport_api
npm install    //(install all modules)
npm run build
heroku create
git push heroku master
heroku ps:scale web=1
heroku open

for checking the logs errors run command: heroku logs --tail
```

## for updating the code:

make changes in code and push on https://github.com/nodeexcel/airport_api.git

#### then commands:
```
heroku login
cd airport_api
git pull origin master
npm run build
git push heroku master
heroku restart

```

##### heroku link: https://afternoon-harbor-76464.herokuapp.com/