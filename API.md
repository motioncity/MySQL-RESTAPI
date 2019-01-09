# API Documentation

# Routes

This API has four routes


 ## `http://localhost:3000/status`
 
 This simply gives us the status of the API, if it is running it will send a resposne saying "Working!"
 
 ***

## The next route `http://localhost:3000/createVideo/`

This route is responsible for creating videos and requires the following parameters
`{name:'', brand:'',year:'', month:'', day:''}`

Year must be in YYYY format 

So an example call would look like 

`http://localhost:3000/createVideo?name=Victor&brand=Youtube&year=2018&month=01&day=08`

Keep in mind that this is a POST call so you would need something like Postman to see. When it is sucessfull it will send a response saying it's sucessful and if not it throws an error in the console. 

***

## The next route is `http://localhost:3000/trackview`

This route is responsible for tracking a video view. It bascially just creates a View object in the Views table on the database. It requires one parameter `{videoid:int}` with videoid being the id of the video we want to watch. If you enter a videoid that doesn't have a record in the Videos table with the corresponding id then you will get a res saying that "There is no video with that id" 

An example call would like 

`http://localhost:3000/trackview?videoid=1`

This is a POST request as well

***

## Finally the last route is `http://localhost:3000/getreport`

This route is responsible for returning a report of the video in addition to how many reports the video has. It has a required parameter of `{videoid:int}` and an additional optional parameter of `{date:YYYY-MM-DD}`. The datae parameter must be in the YYYY-MM-DD format, so for January 8th 2019 you would enter `2019-01-08`.

An example API call can look like either 

`http://localhost:3000/getreport/1`

or

`http://localhost:3000/getreport/1/2019-01-08`

This is a GET Request and it returns an object structured like the following 


