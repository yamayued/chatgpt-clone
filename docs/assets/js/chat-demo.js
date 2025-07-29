// Demo version for GitHub Pages (no API key required)
const message_box = document.getElementById(`messages`);
const message_input = document.getElementById(`message-input`);
const box_conversations = document.querySelector(`#conversations`);
const send_button = document.querySelector(`#send-button`);
let prompt_lock = false;

// Utility functions
const uuid = () => {
  return `xxxxxxxx-xxxx-4xxx-yxxx-${Date.now().toString(16)}`.replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
};

const message_id = () => {
  random_bytes = (Math.floor(Math.random() * 1338377565) + 2956589730).toString(2);
  unix = Math.floor(Date.now() / 1000).toString(2);
  return BigInt(`0b${unix}${random_bytes}`).toString();
};

// Initialize markdown
const markdown = window.markdownit();

const format = (text) => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

const delete_conversations = async () => {
  localStorage.clear();
  await new_conversation();
};

const handle_ask = async () => {
  let message = message_input.value;
  if (message.length > 0) {
    message_input.value = ``;
    await ask_gpt(message);
  }
};

window.handle_ask = handle_ask;

// Demo response for GitHub Pages
const ask_gpt = async (message) => {
  prompt_lock = true;
  window.token = message_id();

  // Add user message
  message_box.innerHTML += `
    <div class="message user">
      <div class="message-wrapper">
        <div class="message-avatar">
          ${user_image}
        </div>
        <div class="message-content"> 
          ${format(message)}
        </div>
      </div>
    </div>
  `;

  message_box.scrollTop = message_box.scrollHeight;

  // Add assistant message container
  message_box.innerHTML += `
    <div class="message assistant">
      <div class="message-wrapper">
        <div class="message-avatar">
          ${gpt_image}
        </div>
        <div class="message-content" id="gpt_${window.token}">
          <div id="cursor"></div>
        </div>
      </div>
    </div>
  `;

  message_box.scrollTop = message_box.scrollHeight;

  // Demo typing effect
  const demoMessage = "本サイトは株式会社こころびが作成しております。現在AIとは接続しておりませんが、接続したらこちらにテキストが反映されます。こういったシステムを開発したい場合は、株式会社こころびにご相談くださいませ。https://cocorobi.co.jp/contact";
  
  const gptDiv = document.getElementById(`gpt_${window.token}`);
  let text = "";
  
  for (let i = 0; i < demoMessage.length; i++) {
    text += demoMessage[i];
    gptDiv.innerHTML = text + '<div id="cursor"></div>';
    await new Promise(r => setTimeout(r, 30));
  }
  
  // Convert URLs to hyperlinks
  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">$1</a>');
  };
  
  gptDiv.innerHTML = linkifyText(text);
  
  // Save to conversation
  add_message(window.conversation_id, "user", message);
  add_message(window.conversation_id, "assistant", demoMessage);
  
  prompt_lock = false;
  await load_conversations(20, 0);
};

const clear_conversations = async () => {
  const elements = box_conversations.childNodes;
  let index = elements.length;

  if (index > 0) {
    while (index--) {
      const element = elements[index];
      if (element.nodeType === Node.ELEMENT_NODE) {
        box_conversations.removeChild(element);
      }
    }
  }
};

const clear_conversation = async () => {
  let messages = message_box.getElementsByTagName(`div`);
  while (messages.length > 0) {
    message_box.removeChild(messages[0]);
  }
};

const new_conversation = async () => {
  window.conversation_id = uuid();
  await clear_conversation();
  await add_conversation(window.conversation_id, "新しい会話");
  await load_conversations(20, 0, true);
};

const load_conversation = async (conversation_id) => {
  let conversation = await JSON.parse(
    localStorage.getItem(`conversation:${conversation_id}`)
  );

  for (item of conversation.items) {
    message_box.innerHTML += `
      <div class="message ${item.role}">
        <div class="message-wrapper">
          <div class="message-avatar">
            ${item.role == "assistant" ? gpt_image : user_image}
          </div>
          <div class="message-content">
            ${item.role == "assistant" ? markdown.render(item.content) : item.content}
          </div>
        </div>
      </div>
    `;
  }

  message_box.scrollTop = message_box.scrollHeight;
};

const get_conversation = async (conversation_id) => {
  let conversation = await JSON.parse(
    localStorage.getItem(`conversation:${conversation_id}`)
  );
  return conversation.items;
};

const add_conversation = async (conversation_id, title) => {
  if (localStorage.getItem(`conversation:${conversation_id}`) == null) {
    localStorage.setItem(
      `conversation:${conversation_id}`,
      JSON.stringify({
        id: conversation_id,
        title: title,
        items: [],
      })
    );
  }
};

const add_message = async (conversation_id, role, content) => {
  before_adding = JSON.parse(
    localStorage.getItem(`conversation:${conversation_id}`)
  );

  before_adding.items.push({
    role: role,
    content: content,
  });

  localStorage.setItem(
    `conversation:${conversation_id}`,
    JSON.stringify(before_adding)
  );
};

const load_conversations = async (limit, offset, loader) => {
  let conversations = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith("conversation:")) {
      let conversation = localStorage.getItem(localStorage.key(i));
      conversations.push(JSON.parse(conversation));
    }
  }

  await clear_conversations();

  for (conversation of conversations) {
    box_conversations.innerHTML += `
    <div class="convo ${window.conversation_id === conversation.id ? 'active' : ''}" id="convo-${conversation.id}" onclick="set_conversation('${conversation.id}')">
      <span class="convo-title">${conversation.title}</span>
      <svg onclick="event.stopPropagation(); show_option('${conversation.id}')" id="conv-${conversation.id}" style="margin-left: auto; width: 16px; height: 16px; cursor: pointer;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
      <svg onclick="event.stopPropagation(); delete_conversation('${conversation.id}')" id="yes-${conversation.id}" style="display:none; width: 16px; height: 16px; cursor: pointer;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <svg onclick="event.stopPropagation(); hide_option('${conversation.id}')" id="not-${conversation.id}" style="display:none; width: 16px; height: 16px; cursor: pointer;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
    `;
  }
};

const show_option = async (conversation_id) => {
  const conv = document.getElementById(`conv-${conversation_id}`);
  const yes = document.getElementById(`yes-${conversation_id}`);
  const not = document.getElementById(`not-${conversation_id}`);

  conv.style.display = "none";
  yes.style.display = "block";
  not.style.display = "block";
};

const hide_option = async (conversation_id) => {
  const conv = document.getElementById(`conv-${conversation_id}`);
  const yes = document.getElementById(`yes-${conversation_id}`);
  const not = document.getElementById(`not-${conversation_id}`);

  conv.style.display = "block";
  yes.style.display = "none";
  not.style.display = "none";
};

const delete_conversation = async (conversation_id) => {
  localStorage.removeItem(`conversation:${conversation_id}`);

  const conversation = document.getElementById(`convo-${conversation_id}`);
  conversation.remove();

  if (window.conversation_id == conversation_id) {
    await new_conversation();
  }

  await load_conversations(20, 0, true);
};

const set_conversation = async (conversation_id) => {
  window.conversation_id = conversation_id;
  await clear_conversation();
  await load_conversation(conversation_id);
  await load_conversations(20, 0, true);
};

// Initialize on load
window.onload = async () => {
  // Check if there are existing conversations
  let hasConversations = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith("conversation:")) {
      hasConversations = true;
      break;
    }
  }
  
  // Only create a new conversation if there are none
  if (!hasConversations) {
    await new_conversation();
  } else {
    // Get the most recent conversation
    let conversations = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith("conversation:")) {
        let conversation = localStorage.getItem(localStorage.key(i));
        conversations.push(JSON.parse(conversation));
      }
    }
    
    // Sort by most recent (assuming last in array is most recent)
    if (conversations.length > 0) {
      // Use the first conversation found (or the most recent one)
      window.conversation_id = conversations[conversations.length - 1].id;
      await load_conversations(20, 0);
      await load_conversation(window.conversation_id);
    } else {
      await new_conversation();
    }
  }
  
  // Keydown event is handled in HTML inline handler
  
  send_button.addEventListener(`click`, async () => {
    if (!prompt_lock) {
      await handle_ask();
    }
  });
};