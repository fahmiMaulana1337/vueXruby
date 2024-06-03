import { defineStore } from "pinia";

let ws;
let url = "https://ruby.simpulchatruby.xyz/";
export const usecounterStore = defineStore("counter", {
  state: () => ({
    message: [],
    rooms: [],
    guid: "",
    user: "",
  }),
  getters: {},
  actions: {
    async wsinit() {
      if (!localStorage.getItem("username")) {
        const username = await this.generateRandomUsername();
        localStorage.setItem("username", username);
        this.user = localStorage.getItem("username");
      } else {
        this.user = localStorage.getItem("username");
      }

      ws = new WebSocket("ws://localhost:3000/cable");

      ws.onopen = () => {
        console.log("WebSocket connection opened");
        this.guid = Math.random().toString(36).substring(2, 15);
        console.log(this.guid);

        ws.send(
          JSON.stringify({
            command: "subscribe",
            identifier: JSON.stringify({
              id: this.guid,
              channel: "MessagesChannel",
            }),
          })
        );
      };

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "ping") return;
        if (data.type === "welcome") return;
        if (data.type === "confirm_subscription") return;

        const message = data.message;
        this.message = [...this.message, message];
        this.scrollDown();
      };

      this.fetchMessage();
    },
    async fetchMessage(roomId) {
      const response = await fetch(`${url}messages?room_id=${roomId}`);
      const data = await response.json();
      this.message = data;
      this.scrollDown();
      return data;
    },
    async sendMessage(message, room) {
      try {
        const payload = {
          body: message,
          room_id: room,
          username: this.user,
        };

        await fetch(`${url}messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        // No need to fetch messages again, WebSocket will handle updates
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRoom() {
      const response = await fetch(`${url}rooms`);
      const data = await response.json();
      this.rooms = data;
    },
    async generateRandomUsername() {
      const adjectives = [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Purple",
        "Orange",
        "Black",
        "White",
        "Silver",
        "Gold",
        "Pink",
      ];
      const nouns = [
        "Cat",
        "Dog",
        "Rabbit",
        "Bird",
        "Fish",
        "Lion",
        "Tiger",
        "Elephant",
        "Monkey",
        "Snake",
        "Horse",
      ];

      const randomAdjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

      return `${randomAdjective}${randomNoun}`;
    },
    scrollDown() {
      const messagesContainer = document.getElementById("chat");
      if (messagesContainer) {
        setTimeout(() => {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
      } else {
        console.log("Messages container not found");
      }
    },
  },
});
