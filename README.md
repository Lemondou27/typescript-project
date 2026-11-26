# IO Chat

Name: CHRISTIAN P. PACLIBAR 

Section: BSIT

## Description

Using TypeScript, Node.js, Express, and Socket.IO, IO Chat enables users to launch the app in a browser and chat in real time with instant message delivery.

## Bonus Features: Sender Name & Message Timestamps

I added two features that were not included in the original version shown in the lesson:

1. **Sender Name (`name`):** Before sending a message, each user enters their name in the input field. The browser sends the `name` together with the message through the `send message` Socket.IO event, and the server broadcasts it so every chat card displays who sent the message.
2. **Message Timestamps (`timestamp`):** When a message arrives at the server, TypeScript attaches a formatted `timestamp` field using the `BroadcastMessage` interface. Each chat message displays the exact time it was sent alongside the sender's name and message text.

## Requirements

- Node.js and npm installed
- Internet connection for the Bootstrap and jQuery CDN files

## How to Run

1. Clone or download this repository.
2. Open the project folder in VS Code or a terminal.
3. Install the dependencies:

   ```bash
   npm run build

4. Start the server:

   ```bash
   npm start

5. Open this address in your browser:
   http://localhost:3000

6. To test the chat, open the same address in two browser windows or tabs. Enter a Name in each one and send messages.

Project Files

CHATAPP/
   ├── Index.html
   ├── server.js
   ├── package.json
   ├── .gitignore
   ├── README.md
   └── screenshots/
       └── IO CHAT.png



Screenshot

After running the application, take a screenshot showing the chat working. For a clearer demonstration, open two browser windows, use different usernames, and show a message from each user. Save the screenshot as:

screenshots/IO CHAT.png
