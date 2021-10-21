# Squad-Finder-API

Contributers: Jaya DeHart, David Whitmore, Jessica Parker, Rachael Rice, Gina Hobbs

## Version 1.0.0

### Change Log

0.0.1 - 9/10/2021 - Scaffold of repo created

1.0.0 - 9/15/2021 - MVP. All planned routes are working and testing complete.

## Description

Sometimes you want to play your favorite video game, but you have no one to play with. This app provides a social media platform to help you find your squad, manage your gaming content, and play the games you love in a team environment!

## Routes
<br >

### **Authentication Routes**  

<br >

*USER MODEL: {*  

  *username: STRING*  

  *password: STRING*  

  *role: ENUM LIST*  

  *token: VIRTUAL*  

  *capabilities: VIRTUAL*  

*}*

- **POST** `/signup` - Create a user profile with a username and password as strings.

  - Your password will not be saved to the DB. It is encrypted before being saved for your protection.

  - CODE REF: `authRouter.post('/signup', signup)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/signup`
  - AUTH: No Auth
  - JSON BODY: {"username": "unqiue_username_here", "password":"some_password_here"}

  Example Response:
  ```json
  {
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV",
        "capabilities": [
            "read",
            "create",
            "update",
            "delete"
        ],
        "role": "admin",
        "id": 5,
        "username": "anewname",
        "password": "$2b$10$t77uJ0c3aAuidLJHGH8Bk.a5TLqAmLX3cJ15XX/rZSPhJwErJr.EC",
        "updatedAt": "2021-10-21T19:40:38.839Z",
        "createdAt": "2021-10-21T19:40:38.839Z",
        "email": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
  }
  ```

- **POST** `/signin` - Pass in a username and a password for an account that has already been created. Uses basic auth practices to verify your identiy and log you in.

  - CODE REF: `authRouter.post('/signin', basicAuth, signin)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/signin`
  - AUTH: Basic
    - Requires username and password

  Example Response:
  ```json
  {
      "user": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik",
          "capabilities": [
              "read",
              "create",
              "update",
              "delete"
          ],
          "id": 5,
          "username": "anewname",
          "password": "$2b$10$t77uJ0c3aAuidLJHGH8Bk.a5TLqAmLX3cJ15XX/rZSPhJwErJr.EC",
          "email": null,
          "role": "admin",
          "createdAt": "2021-10-21T19:40:38.839Z",
          "updatedAt": "2021-10-21T19:40:38.839Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik"
  }
  ```


-----------------------------------------------


### **Profile Routes**


<br >

*PROFILE MODEL: {*  

  *username: STRING*  

  *bio: STRING*  

  *games: ENUM LIST*    

*}*

- All routes use bearer authentication middleware that requires you to be signed in.

- **POST** `/profile` - Takes in a body object of a bio(*string*) and a game(s) which are from a set list (Madden, Fortnite, Minecraft, League of Legends for now) and creates a new record in the database for the logged in user with that info.

  - This list will eventually be displayed on a UI as a dropdown menu to be selected from.

  - CODE REF: `profileRouter.post('/profile', bearerAuth, acl('create'), handleCreate)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/profile`
  - AUTH: Bearer
    - Requires bearer token
  - JSON BODY: {"bio": "user bio info goes here", "game": "user's favorite game here"}

  Example Response:
  ```json
  {
    "games": "Minecraft",
    "id": 3,
    "bio": "This is a bio for a test user.",
    "UserId": 5,
    "username": "anewname",
    "updatedAt": "2021-10-21T20:15:47.619Z",
    "createdAt": "2021-10-21T20:15:47.619Z"
  }
  ```


- **GET** `/profile` - Returns the profile data from the signed in user.

  - CODE REF: `profileRouter.get('/profile', bearerAuth, acl('read'), handleGetOne)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/profile`
  - AUTH: Bearer
    - Requires bearer token

  Example Response:
  ```json
  {
    "games": "Minecraft",
    "id": 3,
    "bio": "This is a bio for a test user.",
    "UserId": 5,
    "username": "anewname",
    "updatedAt": "2021-10-21T20:15:47.619Z",
    "createdAt": "2021-10-21T20:15:47.619Z"
  }
  ```


- **PUT** `/profile` - Takes in a body object that can have bio or game names (from the above list) and will update the signed in user's profile on the database.

  - CODE REF: `profileRouter.put('/profile' bearerAuth, acl('update'), handleUpdateOne)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/profile`
  - AUTH: Bearer
    - Requires bearer token
  - JSON BODY: {"bio":"I have updated the test users bio"}

  Example Response:
  ```json
  [
    1
  ]
  ```


- **DELETE** `/profile` - Allows for the removal of the logged in user's profile from the database.

  - CODE REF: `profileRouter.delete('/profile', bearerAuth, acl('delete'), handleDeleteOne)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/profile`
  - AUTH: Bearer
    - Requires bearer token

  Example Response:
  ```json
  profile was deleted
  ```


----------------------------------


### **Achievement Routes**

<br >

*ACHIEVEMENTS MODEL: {*  

  *game: STRING*  

  *rank: STRING*  

  *progress: ENUM LIST*  

  *lastplayed: DATE*  

*}*

- All routes use bearer authentication middleware that requires you to be signed in.

- **POST** `/achievements` - Takes in an object with game(*string*), rank(*string*), progress(*string*), lastplayed(*date*). Then creates a record in the database with that info.

  - Each game must be unique and should align with the games on the user's profile.

  - CODE REF: `achievementsRouter.post('/achievements', bearerAuth, acl('create'), handleCreate)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


- **GET** `/achievements` - Returns the database record of achievements for the signed in user.

  - CODE REF: `achievementsRouter.get('/achievements', bearerAuth, acl('read'), handleGetAll)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


- **GET** `/achievements/:id` - Returns the database record of the specific achievement record based on the id from the route parameter.

  - CODE REF: `achievementsRouter.get('/achievements/:id', bearerAuth, acl('read'), handleGetOne)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


- **PUT** `/achievements/:id` - Returns the updated record of the signed in user's achievements. Takes an object matching the above mentioned schema for input.

  - CODE REF: `achievementsRouter.put('/achievements/:id', bearerAuth, acl('update'), handleUpdate)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```



- **DELETE** `/achievements/:id` - Allows for deletion of a specific achievement from the database as long as the signed in user is the owner of the achievement.

  - CODE REF: `achievementsRouter.delete('/achievements/:id', bearerAuth, acl('delete'), handleDelete)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


----------------------------------


### **Friends Routes**
<br >

*JUNCTION TABLES:*  

  *FRIENDS*  

  *BLOCKEDUSERS*  

  *FRIENDREQUESTS*  
  <br >

- All routes use bearer authentication middleware that requires you to be signed in.

- **GET** `/users` - Returns all current users.

  - This route is intended to be used on the UI to populate a search page to find new squad mates.
  - This route does not have bearer authentication associated with it but the potential page on a UI would be blocked behind a login requirement.

  - CODE REF: `friendsRouter.get('/users', getAllUsers)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **GET** `/friendRequests` - Returns all current friend request for the signed in user.

  - CODE REF: `friendsRouter.get('/friendRequests', bearerAuth, showAllRequests)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **DELETE** `/friendRequests/:id` - Removes the selected friend request from the database. Selection is based on the route parameter id. This id is the id of the user that made the request.

  - CODE REF: `friendsRouter.delete('/friendRequests/:id', bearerAuth, rejectRequest)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **POST** `/friends/:id` - Adds a friend to the database between the logged in user and user of the id from the route parameter.

  - This will also delete the friend request from the database.
  - The route parameter should be for a user that has already made a request.

  - CODE REF: `friendsRouter.post('/friends/:id', bearerAuth, acceptRequest)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **POST** `/friendRequests/:id` - Add a friend request to the database between the logged in user and the user whose id is specified in the route parameter.

  - CODE REF: `friendsRouter.post('/friendRequests/:id', bearerAuth, addFriendRequest)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **GET** `/friends` - Returns a lost of the friends for the logged in user.

  - CODE REF: `friendsRouter.get('/friends', bearerAuth, showFriends)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **DELETE** `/friends/:id` - Removes the record from the database for the friend relationship between the logged in user and the user specified by the route parameter.

  - CODE REF: `friendsRouter.delete('/friends/:id', bearerAuth, deleteFriend)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **DELETE** `/friendRequests/:id` - Removes the record from the database for the friend request between the logged in user and the user specified in the route parameter.

  - CODE REF: `friendsRouter.delete('/blockFriend/:id', bearerAuth, blockFriend)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


------------------------------



### **Squad Routes**
<br >

*SQUAD MODEL: {*  

  *name: STRING*  

  *owner: STRING*  

*}*

- All routes use bearer authentication middleware that requires you to be signed in.

- **POST** `/squads` - Creates a squad in the database with the logged in user as the 'creator' and the list of passed in users as the members.

  - The list must be the ID's of the users and that will have to be managed by the UI.
  - This route uses a junction table and creates associations for each user to the squad on that table.

  - CODE REF: `squadRouter.post('/squads', bearerAuth, createSquad)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```


- **GET** `/squads` - Returns all the squads (with all members) for the logged in user.

  - CODE REF: `squadRouter.get('/squads', bearerAuth, getUserSquads)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```

- **DELETE** `/squads` - Removes a associations for all members to a given squad from the database. Must have a squad ID bassed in on the request body.

  - CODE REF: `squadRouter.delete('/squads', bearerAuth, deleteSquad)`

  - ENDPOINT: `https://squadfinderapp.herokuapp.com/`
  - AUTH: 
    - Requires 

  Example Response:
  ```json
 
  ```
