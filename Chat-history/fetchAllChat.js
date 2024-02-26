const Redis = require('ioredis');

// Setup Redis connection with TLS and authentication
const redis = new Redis({
  port: 50665, // Redis port
  host: 'pleased-peacock-50665.upstash.io', // Redis host
  password: '98abb221d67d449293d61c69a83ae573', // Redis password
  tls: {} // Enable TLS
});

async function fetchAllChats() {
  let cursor = '0';
  const chats = [];

  do {
    // Use SCAN to find all keys that match the chat:* pattern
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', 'chat:*', 'COUNT', 100);
    cursor = nextCursor;

    // For each key, use HGETALL to fetch the chat data
    for (const key of keys) {
      const chatData = await redis.hgetall(key);
      if (chatData && chatData.messages) {
        try {
          // Parse the messages JSON string
          const messages = JSON.parse(chatData.messages);

          // Store chat ID and messages in the array
          chats.push({ id: chatData.id, messages });
        } catch (e) {
          console.error(`Error parsing messages for chat ${chatData.id}:`, e);
        }
      }
    }
  } while (cursor !== '0');

  return chats;
}

fetchAllChats().then(chats => {
  console.log("Fetched chats with messages:");
  chats.forEach((chat, index) => {
    console.log(`Chat ID: ${chat.id}, Messages: ${JSON.stringify(chat.messages, null, 2)}`);
    if (index < chats.length - 1) {
      console.log("---");
    }
  });
}).catch(console.error);
