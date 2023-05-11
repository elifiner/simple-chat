<template>
<div class="flex flex-col h-screen mx-auto px-2 sm:px-0 sm:py-5 max-w-2xl">
  <div class="flex-grow overflow-y-auto flex flex-col-reverse">
    <div v-for="(message, index) in messages.slice().reverse()" :key="index" 
         class="mb-2 p-4 rounded-lg" 
         :class="{'bg-blue-200': message.sender === 'user', 'bg-red-200': message.sender === 'bot'}">
      {{ message.text }}
    </div>
  </div>
  <div class="w-full">
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="w-full p-2 border-t-2 border-red-200 focus:outline-none" />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
    }
  },
  methods: {
    async sendMessage() {
      console.log('send message');
      const message = {
        text: this.newMessage,
        sender: 'user',
      }
      this.messages.push(message)
      this.newMessage = ''

      const response = await $fetch('/api/chat', { method: 'post', body: { message: message.text } })

      this.messages.push({
        text: response.message,
        sender: 'bot',
      })
    },
  },
}
</script>
