'use client';

import styles from '@/app/styles/Home.module.css';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRobot, FaUtensils } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push('/chat');
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className={styles.title}>
        <FaRobot /> Smart Recipe Chatbot <FaUtensils />
      </h1>
      <p className={styles.subtitle}>
        Discover personalized recipes by chatting with our AI chef!
      </p>
      <button className={styles.button} onClick={handleStartChat}>
        Start Chatting 🍽️
      </button>
    </motion.div>
  );
}
