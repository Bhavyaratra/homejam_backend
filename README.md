## API DOCS

### **register**     

POST    
url : http://localhost:5000/api/auth/register   
header : content-type : application/json
```json
body : {
    "username" : "dev-teacher",
    "email" : "tech@gmail.com",
    "role" : "teacher",
    "password": "123456"
}
```
note : for student, role : student

---
### **login**

POST    
url : http://localhost:5000/api/auth/login   
header : content-type : application/json

```json
body : {
    "email" : "dev@gmail.com",
    "password": "123456"
}
```
```json
response : {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGNkYmI3MzhlNTBjMDQ3ODRiOWI3OCIsImlhdCI6MTY0NTAyMjU3MSwiZXhwIjoxNjQ1MDI2MTcxfQ.mceHFPSu2H1O2Q17BKotREYEebht1UQ7k6DnMzv1rxQ",
    "user": {
        "id": "620cdbb738e50c04784b9b78",
        "username": "dev-student",
        "email": "dev@gmail.com",
        "role": "student"
    }
}
```
---
### **create class**

POST    
url : http://localhost:5000/api/class/create  
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>
```json
body:{
    "subject":"hindi",
    "description":"new"
}
```
```json
response:{
    "message": "Class is created Successfully",
    "data": {
        "students": [],
        "_id": "620d0cd0a46ff72648cc4f33",
        "subject": "hindi",
        "description": "new",
        "createdBy": "620d08d7225eb824ec275ef8",
        "__v": 0
    }
}
```
---
### **get classes**
POST  
url : http://localhost:5000/api/class/get  
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>

```json
response:{
    "success":"true",
    "data" : [
        "<array of classes>"
    ]
}
```
---
### **update class**
POST  
url : http://localhost:5000/api/class/update  
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>
```json
body:{
    "classId": "620cf56e9e863329f43248a0",
    "subject":"english updated",
    "description":"reading"
}
```
```json
response:{
   "success":true, 
   "message" : "Class is updated Successfully"
}
```
---
### **delete class**
POST  
url : http://localhost:5000/api/class/delete  
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>
```json
body:{
    "classId":"620cedfc5360c824ec1663e7
}
```
```json
response:{
   "success": "true",
   "message" : "class deleted"
}
```
---
### **add student**
POST  
url : http://localhost:5000/api/class/addStudent
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>
```json
body:{
    "classId":"620d0cc4a46ff72648cc4f32",
    "studentId":"620cdbb738e50c04784b9b78"
}
```
```json
response:{
   "success": "true",
   "message" : "added student"
}
```
---
### **remove student**
POST  
url : http://localhost:5000/api/class/removeStudent
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>
```json
body:{
    "classId":"620d0cc4a46ff72648cc4f32",
    "studentId":"620cdbb738e50c04784b9b78"
}
```
```json
response:{
   "success": "true",
   "message" : "removed student"
}
```
---

### **student - get classes**
POST  
url : http://localhost:5000/api/student/classes
```json
header :{"content-type" : "application/json",
"Authorization" : "Bearer <token from login>"
}
```
note add token without <>

```json
response:{
 "success": true,
 "data": ["<list of joined classes with instructor details populated>"]
}
```
---




