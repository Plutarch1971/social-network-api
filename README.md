<h1 style="text-align: center;">Social Network Application</h1>

## Table of Contents
[<span style="font-size: 20px;">Project Overview</span>](#project-overview)
- [<span style="font-size: 18px;">Features</span>](#features)
- [<span style="font-size: 18px;">Api Routes</span>](#api-routes)
- [<span style="font-size: 18px;">Installation</span>](#installation)
- [<span style="font-size: 18px;">Setup Instructions</span>](#setup-instructions)
- [<span style="font-size: 18px;">Front End</span>](#front-end)
- [<span style="font-size: 18px;">Walkthrough Video</span>](#walkthrough-video)
- [<span style="font-size: 18px;">Contact</span>](#contact)

## Overview
The goal of Social Network Application is to build a backend API for a social network web application using:
MongoDB for handling large amounts of unstructured data. Express.js is used for routing. Mongoose is used for object data modeling.


## Features

The project includes:
User and Thought Models:
User schema is created with properties like username, email, thoughts, and friends.
Thought schema is created  with properties like thoughtText, createdAt, username, and reactions as subdocuments.
Reaction subdocument schema is created with fields for reactionId, reactionBody, username, and createdAt. Users can:
Share thoughts.
React to others' thoughts.
Manage a friend list.

## API Routes:
As a social media startup, the API is designed to handle large amounts of unstructured data efficiently.
Api routes are created for 
CRUD operations for users and thoughts, add/remove friends and add/delete reactions to thoughts.


## Installation
To clone the repository, run the following command:

git clone https://github.com/Plutarch1971/social-network-api.git

Ensure MongoDB is installed locally.

## Setup Instructions
Start the server and sync Mongoose models to MongoDB.
To start the server run the following command:

npm run build<br>
npm start

Handle GET, POST, PUT, and DELETE routes for users and thoughts.
Allow adding/removing friends and managing reactions.


## Front End
Use Insomnia to create and test the API.
You can test all routes (users, thoughts, friends, reactions).
You can test the routes to fetch all users, specific users, thoughts, and reactions.
There are routes to create, update, or delete users and thoughts.

## Walkthrough Video
A walkthrough video link: https://youtu.be/wGgbqsZab5I<br>
Repository Link: https://github.com/Plutarch1971/social-network-api.git

## Contact:
Github: https://github.com/Plutarch1971 <br>
Email: matthewpmendez@gmail.com

