# -JS_UDA--image_process_api
### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Eslint: ```npm run eslint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 8080:

#### Endpoint to resize images
http://localhost:8080/api/images

Expected query arguments are:
- _filename_: Available filenames in http://localhost:8080/api/images/list_available
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1
http://localhost:8080/api/images
![Alt text](image.png)

#### Example 2
![Alt text](image-1.png)

#### Example 3
![Alt text](image-2.png)

#### Example 4
![Alt text](image-3.png)

#### Example 5
![Alt text](image-4.png)

#### Example 6
![Alt text](image-5.png)


#### Run test
![Alt text](image-6.png)

#### Run eslint
![Alt text](image-7.png)

#### Run prettify 
![Alt text](image-8.png)