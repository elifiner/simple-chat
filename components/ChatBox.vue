<template>
<div class="text-white bg-gray-500 flex flex-col h-screen mx-auto sm:py-5">
  <div class="mb-6 flex-grow overflow-y-auto flex flex-col-reverse mb-2 px-2 sm:px-0">
    <div v-for="(message, index) in messages.slice().reverse()" :key="index"
         class="p-4 rounded-none w-full"
         :class="{'bg-gray-600': message.role === 'user', 'bg-gray-500': message.role === 'bot'}">
      <div class="max-w-2xl mx-auto">
        <div class="flex">
          <div class="w-8">
            <div v-if="message.role === 'user'" class="mr-2"><UserIcon class="h-6 w-6 text-blue-200" /></div>
            <div v-else class="mr-2"><PrinterIcon class="h-6 w-6 text-blue-200" /></div>
          </div>
          <div class="flex-grow">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-2 sm:px-0">
    <div class="max-w-2xl mx-auto">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="w-full p-3 focus:outline-none rounded-lg bg-gray-600 shadow-xl" />
    </div>
  </div>
</div>
</template>

<script>
import { UserIcon } from '@heroicons/vue/24/solid'
import { PrinterIcon } from '@heroicons/vue/24/solid'
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
    }
  },
  methods: {
    async sendMessage() {
      const message = {
        content: this.newMessage,
        role: 'user',
      }
      this.messages.push(message)
      this.newMessage = ''

      const response = await $fetch('/api/chat', { method: 'post', body: { messages: this.messages } })

      this.messages.push({
        content: response.message,
        role: 'assistant',
      })
    },
  },
  components: {
    PrinterIcon,
    UserIcon,
  },
}
</script>
