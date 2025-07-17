import Link from 'next/link';
import styles from '@/app/styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/chat">🍳 Chatbot</Link>
      <Link href="/favorites">💛 Favorites</Link>
    </nav>
  );
}
