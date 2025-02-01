import { useState } from 'react';
import { useImmer } from 'use-immer';
import { createChat, sendChatMessage } from './api'; // Corrected import
import { parseSSEStream } from './utils';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import assistantIcon from './botimages/robot.png';
import userIcon from './botimages/user.svg';

function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([
    { role: 'user', content: 'Hi, what are the latest tech trends?', icon: userIcon },
    { role: 'assistant', content: 'Hello! Some of the latest tech trends include AI advancements, blockchain applications, and quantum computing.', icon: assistantIcon }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages(draft => [
      ...draft,
      { role: 'user', content: trimmedMessage, icon: userIcon },
      { role: 'assistant', content: '', sources: [], loading: true, icon: assistantIcon }
    ]);
    setNewMessage('');

    let chatIdOrNew = chatId;
    try {
      if (!chatId) {
        const { id } = await createChat(trimmedMessage, true, "Web Development", "I want to learn angular"); // Use the imported function
        setChatId(id);
        chatIdOrNew = id;
      }

      const data = await sendChatMessage(chatIdOrNew, trimmedMessage, false, "Web Development", "I want to learn angular"); // Use the imported function

      if (data && data.response) {
        setMessages(draft => {
          draft[draft.length - 1].content = data.response;
          draft[draft.length - 1].loading = false;
        });
      } else {
        console.error('Invalid response data:', data);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  return (
    <div className="flex flex-col h-[1000px] max-w-1300xl mx-auto bg-white border border-black shadow-lg rounded-xl p-6">
      <div className="text-center text-xl font-semibold text-gray-700">Personalized AI Chatbot</div>
      <div className="grow overflow-y-auto space-y-4 p-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export default Chatbot;
