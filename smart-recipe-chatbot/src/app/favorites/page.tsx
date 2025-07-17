'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/styles/ChatBot.module.css';
import ReactMarkdown from 'react-markdown';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Message[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteRecipes');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className={styles.chatContainer}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>💛 Saved Recipes</h2>
        <button onClick={handlePrint} className={styles.saveButton}>
          🖨️ Print or Save as PDF
        </button>
      </div>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No favorites saved yet.</p>
      ) : (
        <div className={styles.messages}>
          {favorites.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles.bot}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
