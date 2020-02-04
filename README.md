
# Tournament System

This app saves game results and ranks players according to their wins & losses

The app follows the **Separation of concerns** software architecture design pattern.

The app is made by ReactJSin the frondend, NodeJS in the backend and docker for provisioning.

# Easy Setup

**Prerequisites:**
 - Docker
 - Docker compose
```
$ sudo apt-get update
```
```
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
 - Make these ports available: 3306, 7000, 3000. They are needed for the apps to run.

----

1. Donwload the repo
```
$: git clone git@github.com:mescalito/tournament.git
```

Note that the repo is HUGE because node_modules folder is present (twise). I know right!

 2. Run:
```
$: cd tournament/
````

3. Run:
```
$: docker-compose up
```

You are good to go. Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)
BackEnd API:
[http://localhost:7000/api-explorer](http://localhost:7000/api-explorer)


# Containers

You just creted three new containers
- For MySQL
User:root
Pw: root
(Just remember to make sure port 3306 is available when running docker-compose)

- NodeJS backend on port 7000 running Express/Babel/Swagger

- NodeJS frontend on port 3000 running ReactJS with Redux and Redux-thunk

## Stored Procedure

    CREATE DEFINER=`root`@`%` PROCEDURE `resultsGame`(player1 VARCHAR(45), player2 VARCHAR(45), player1Score tinyint, player2Score tinyint)
    BEGIN
    DECLARE player1ID INT;
    DECLARE player2ID INT;
    DECLARE pGameId INT;
    
    if exists(select * from players where name = player1) then
    select id into player1ID from players where name = player1;
    else
    insert into players(id, name) values (id, player1);
    SELECT LAST_INSERT_ID() INTO player1ID;
    end if;
    
    if exists(select * from players where name = player2) then
    select id into player2ID from players where name = player2;
    else
    insert into players(id, name) values (id, player2);
    SELECT LAST_INSERT_ID() INTO player2ID;
    end if;
    
    if player1Score >= player2Score then
    insert into games (player1id, player2id, player1Score, player2Score)
    values (player1ID, player2ID, player1Score, player2Score);
    else
    insert into games (player1id, player2id, player1Score, player2Score)
    values (player2ID, player1ID, player2Score, player1Score);
    end if;
    
    SELECT LAST_INSERT_ID() INTO pGameId;
    select g.id, p1.name player1name, p2.name player2name, g.player1Score, g.player2Score, g.date
    from games g
    inner join players p1 on g.player1id = p1.id
    inner join players p2 on g.player2id = p2.id
    where g.id = pGameId;
    END

## UI

API Swagger: [http://localhost:7000/api-explorer](http://localhost:7000/api-explorer)
![enter image description here](https://i.ibb.co/6NTDHy4/backend.png)

Frontend: [http://localhost:3000](http://localhost:3000)
![enter image description here](https://i.ibb.co/1mVySws/frontend.png)

TODO:
Migrato code to async await back and frond end
Migrate to react hooks, frontend
User ORM (sequalize?) , backend
Include Istambul for 100% code coverage, backend
TTD with Jest or Mocha, backend
Deploy to microservice in AWS.
Use Joi library for Swagger autovalidation
Couple endpoints with swagger spec for validation and improve code injection
Minify and bundle front and backend
