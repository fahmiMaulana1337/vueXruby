<script>
import { usecounterStore } from "@/stores/counter";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      selectedRoom: null,
      filledMessage: "",
      errorInput: "",
    };
  },
  computed: {
    ...mapState(usecounterStore, ["message", "guid", "rooms", "user"]),
  },
  methods: {
    ...mapActions(usecounterStore, [
      "wsinit",
      "sendMessage",
      "fetchRoom",
      "fetchMessage",
    ]),
    initCon() {
      this.wsinit();
    },
    send() {
      if (this.filledMessage.length > 0) {
        this.errorInput = "";
        this.sendMessage(this.filledMessage, this.selectedRoom.id);
        this.filledMessage = ""; // Clear input after sending message
      } else {
        this.errorInput = "Fill Message First";
      }
    },
    selectRoom(room) {
      this.fetchMessage(room.id);
      this.selectedRoom = room;
    },
  },
  created() {
    this.initCon();
    this.fetchRoom();
  },
};
</script>

<template>
  <div class="content" style="margin-top: 50px">
    <div id="container" class="container-with-shadow">
      <aside>
        <header style="background-color: #643a6b">
          <h5 style="color: #fff; font-size: 18px; font-weight: bold">
            Welcome to the Chat Rooms
          </h5>
          <p style="color: #ccc; font-size: 14px">
            Select a room to join the conversation
          </p>
        </header>
        <ul>
          <li v-for="room in rooms" :key="room.id" @click="selectRoom(room)">
            <img
              src="https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg?size=338&ext=jpg&ga=GA1.1.1788614524.1717200000&semt=ais_user"
              alt=""
              style="max-width: 70px"
            />
            <div>
              <h2>#{{ room.id }} {{ room.name }}</h2>
              <h3>
                <span class="status blue"></span>
              </h3>
            </div>
          </li>
        </ul>
      </aside>
      <main>
        <header class="chat-header">
          <img
            src="https://ih1.redbubble.net/image.2976534815.9818/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            alt="User Avatar"
            style="max-width: 70px; border-radius: 50px; margin-top: -20px;"
          />
          <div class="user-details">
            <h2>Hi there, {{ user }}!</h2>
            <p>Chat away!</p>
          </div>
        </header>
        <div class="chat_form" v-if="selectedRoom">
          <ul id="chat">
            <li
              v-for="chat in message"
              :key="chat.id"
              :class="{ you: chat.username != user, me: chat.username == user }"
            >
              <div class="entete">
                <span
                  class="status"
                  :class="{
                    green: chat.username === user,
                    blue: chat.username !== user,
                  }"
                ></span>
                <h2>{{ chat.username }}</h2>
              </div>
              <div class="triangle"></div>
              <div class="message">
                {{ chat.body }}
              </div>
            </li>
          </ul>
        </div>
        <div class="attention" v-if="!selectedRoom">
          <center>
            <h1 style="margin-top: 200px">Choose Room First</h1>
          </center>
        </div>
        <footer>
          <div class="text-input-message" v-if="selectedRoom">
            <textarea
              v-model="filledMessage"
              placeholder="Type your message"
              @keyup.enter="send()"
            ></textarea>
            <span style="color: red" v-if="errorInput.length > 0">
              * {{ errorInput }}
            </span>
            <a @click="send()" style="margin-right: 500px" href="#">
              <button style="background-color: #a19afe; border-radius: 10px">
                Send
              </button>
            </a>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style></style>
