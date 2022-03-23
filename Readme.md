# facebook messenger chatbot

A simple facebook messenger chat bot built on a Node.js (ES6) server, connects with MongoDB and uses Facebook Messenger Webhook.

## What can this bot do / features:
- The chatbot can handle a simple task. When a user start a conversation it will ask for 
  user's name, user's birthday & offer to calculate how many days till user's next 
  birthday.
- Turn on/off typing

![chatbot](https://user-images.githubusercontent.com/44417858/159648579-a16a13d8-367b-442f-87ff-0b6800fa7913.gif)


## Test the bot
- Feel free to test my bot👉: https://chat-bot-messanger.herokuapp.com/
- The Facebook Page I embedded the bot in: https://web.facebook.com/Devwurld-100531512615895/

### How to setup this bot for your own Facebook Page without any cost ?
#### 1. Clone this project
#### 2. Rename .env.example to .env
#### 3. Add your database url, FB page token which can be gotten from fecebook developer app and verify token
#### 4. Create an Heroku app
#### 5. Deploy this project to your Heroku app
#### 6. Create a Facebook Developer App, A Facebook Page (to embed this bot)
#### 7. Going to Facebook Developer App, add the Messenger Product, generate FACEBOOK_PAGE_ACCESS_TOKEN, config the webhook (default, the url for the webhook is: <the_domain_your_herokuapp>/webhook ) . 
#### 8 Remember to update the config variables on Heroku as well.
#### 9 If you want to run this project on Express server, first open 
Enjoy!!!

### `npm run dev`

Runs the app in development mode.<br>
The bot will automatically reload if you make changes to the code.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

```sh
npm run dev -- --console
```

### `npm start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

```sh
npm start -- --console
```

### `npm run lint`

Runs the linter rules using [Eslint](https://eslint.org/).

### `npm test`

Runs the test cases using [Mocha](https://mochajs.org/).


## Rest API
### This project has REST API that can be used to access all received messages, access single chat by ID & summary.

- __GET ```/messages```__: show all received messages

![1](https://user-images.githubusercontent.com/44417858/159649506-f07ec4b1-93a4-452f-a434-8b53f77b2e98.png)

- __GET ```/messages/{id}```__: get a single message by ID

![2](https://user-images.githubusercontent.com/44417858/159649522-6e4a58b9-e372-4afd-b6e6-f8d930854245.png)

- __GET ```/summary```__: get all custom messages

![3](https://user-images.githubusercontent.com/44417858/159649557-580ea4f4-2fae-483d-9809-1f4361986383.png)
