'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/app/styles/ChatBot.module.css';
import { FaPaperPlane } from 'react-icons/fa';
import { getAIRecipe } from '@/utils/api';
import ReactMarkdown from 'react-markdown';


type Message = {
  sender: 'user' | 'bot';
  text: string;
};

// Load favorites from localStorage
const getStoredFavorites = (): Message[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('favoriteRecipes');
  return stored ? JSON.parse(stored) : [];
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites: Message[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '👋 Hi there! Tell me what ingredients you have today.' },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [savedMsgIndex, setSavedMsgIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Message[]>(getStoredFavorites());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsThinking(true);

    const recentMessages = [...messages.slice(-4), newUserMessage]; // Last 5 messages
    const openaiFormattedMessages = recentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    const botText = await getAIRecipe(openaiFormattedMessages);

    const botReply: Message = { sender: 'bot', text: botText };
    setMessages((prev) => [...prev, botReply]);
    setIsThinking(false);
  };

  const handleNewChat = () => {
    setMessages([
      { sender: 'bot', text: '👋 Hi there! Tell me what ingredients you have today.' }
    ]);
    setInput('');
    setSavedMsgIndex(null);
  };

  const handleSaveFavorite = (msg: Message, index: number) => {
    const newFavorites = [...favorites, msg];
    setFavorites(newFavorites);
    saveFavoritesToStorage(newFavorites);
    setSavedMsgIndex(index);
    setTimeout(() => setSavedMsgIndex(null), 2000);
  };

  return (
    <div className={styles.chatContainer}>
      <button onClick={handleNewChat} className={styles.newChatButton}>
        🆕 New Chat
      </button>

      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.user : styles.bot
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
            {msg.sender === "bot" && (
              <div style={{ marginTop: "0.5rem" }}>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    setFavorites((prev) => [...prev, msg]);
                    setSavedMsgIndex(index);
                    setTimeout(() => setSavedMsgIndex(null), 2000);
                  }}
                >
                  💾 Save to Favorites
                </button>
                {savedMsgIndex === index && (
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      color: "#4caf50",
                      fontWeight: 500,
                    }}
                  >
                    ✅ Saved!
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className={styles.typingIndicator}>🤖 AI is thinking…</div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Type ingredients or a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isThinking}
        />
        <button onClick={handleSend} disabled={isThinking}>
          {isThinking ? (
            <span className={styles.spinner}></span>
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
    </div>
  );
}
