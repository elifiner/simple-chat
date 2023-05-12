export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return {
      message: 'You said ' + body.messages[body.messages.length - 1].text
    }
})