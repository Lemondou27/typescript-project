import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server, Socket } from "socket.io";

interface ChatMessagePayload {
  name: string;
  msg: string;
  timestamp?: string;
}

interface BroadcastMessage {
  name: string;
  msg: string;
  timestamp: string;
}

interface ServerToClientEvents {
  "new message": (data: BroadcastMessage) => void;
}

interface ClientToServerEvents {
  "send message": (data: ChatMessagePayload) => void;
}

const PORT = Number(process.env.PORT) || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

const connections: Socket<ClientToServerEvents, ServerToClientEvents>[] = [];

function formatCurrentTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

app.get("/", (_req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, "..", "Index.html"));
});

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>): void => {
  connections.push(socket);
  console.log("Connected: %s socket(s) connected", connections.length);

  socket.on("disconnect", (): void => {
    const index = connections.indexOf(socket);
    if (index !== -1) {
      connections.splice(index, 1);
    }
    console.log("Disconnected: %s socket(s) connected", connections.length);
  });

  socket.on("send message", (data: ChatMessagePayload): void => {
    const cleanName = data.name.trim();
    const cleanMsg = data.msg.trim();

    if (!cleanName || !cleanMsg) {
      return;
    }

    const messageWithTime: BroadcastMessage = {
      name: cleanName,
      msg: cleanMsg,
      timestamp: formatCurrentTime(),
    };

    console.log(messageWithTime);
    io.emit("new message", messageWithTime);
  });
});

server.listen(PORT, (): void => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});