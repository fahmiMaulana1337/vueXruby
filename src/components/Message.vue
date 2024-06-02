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
  <div class="content" style="margin-top: 30px">
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
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
            alt="User Avatar"
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

<style scoped>
* {
  box-sizing: border-box;
}
body {
  background-color: #abd9e9;
  font-family: Arial;
}
#container {
  width: 750px;
  background: #eff3f7;
  margin: 0 auto;
  font-size: 0;
  border-radius: 70px;
  overflow: hidden;
}
aside {
  width: 260px;
  background-color: #3b3e49;
  display: inline-block;
  font-size: 15px;
  vertical-align: top;
  border-radius: 70px;
  height: 600px;
}
main {
  width: 490px;
  display: inline-block;
  font-size: 15px;
  vertical-align: top;
  border-radius: 100px;
}

aside header {
  padding: 30px 20px;
}
aside input {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 50px 0 20px;
  background-color: #5e616a;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_search.png);
  background-repeat: no-repeat;
  background-position: 170px;
  background-size: 40px;
}
aside input::placeholder {
  color: #fff;
}
aside ul {
  padding-left: 0;
  margin: 0;
  list-style-type: none;
  /* overflow-y: scroll; */
  /* height: 690px; */
}
aside li {
  padding: 10px 0;
}
aside li:hover {
  background-color: #5e616a;
}
h2,
h3 {
  margin: 0;
}
aside li img {
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 8px;
}
aside li div {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
}
aside li h2 {
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  margin-bottom: 5px;
}
aside li h3 {
  font-size: 12px;
  color: #7e818a;
  font-weight: normal;
}

.status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 7px;
}
.green {
  background-color: #58b666;
}
.orange {
  background-color: #ff725d;
}
.blue {
  background-color: #6fbced;
  margin-right: 0;
  margin-left: 7px;
}

main header {
  height: 110px;
  padding: 30px 20px 30px 40px;
}
main header > * {
  display: inline-block;
  vertical-align: top;
}
main header img:first-child {
  border-radius: 50%;
}
main header img:last-child {
  width: 24px;
  margin-top: 8px;
}
main header div {
  margin-left: 10px;
  margin-right: 145px;
}
main header h2 {
  font-size: 16px;
  margin-bottom: 5px;
}
main header h3 {
  font-size: 14px;
  font-weight: normal;
  color: #7e818a;
}

#chat {
  padding-left: 0;
  margin: 0;
  list-style-type: none;
  overflow-y: scroll;
  height: 300px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
}
#chat li {
  padding: 10px 30px;
}
#chat h2,
#chat h3 {
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
}
#chat h3 {
  color: #bbb;
}
#chat .entete {
  margin-bottom: 5px;
}
#chat .message {
  padding: 20px;
  color: #fff;
  line-height: 25px;
  max-width: 90%;
  display: inline-block;
  text-align: left;
  border-radius: 5px;
}
#chat .me {
  text-align: right;
}
#chat .you .message {
  background-color: #58b666;
}
#chat .me .message {
  background-color: #6fbced;
}
#chat .triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
}
#chat .you .triangle {
  border-color: transparent transparent #58b666 transparent;
  margin-left: 15px;
}
#chat .me .triangle {
  border-color: transparent transparent #6fbced transparent;
  margin-left: 375px;
}

main footer {
  height: 155px;
  padding: 20px 30px 10px 20px;
}
main footer textarea {
  resize: none;
  border: none;
  display: block;
  width: 100%;
  height: 80px;
  border-radius: 3px;
  padding: 20px;
  font-size: 13px;
  margin-bottom: 13px;
}
main footer textarea::placeholder {
  color: #ddd;
}
main footer img {
  height: 30px;
  cursor: pointer;
}
main footer a {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: #6fbced;
  vertical-align: top;
  margin-left: 333px;
  margin-top: 5px;
  display: inline-block;
}
</style>
