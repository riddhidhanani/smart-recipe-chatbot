'use client';

import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('@/app/components/ChatBot'), { ssr: false });

export default function ClientChatWrapper() {
  return <ChatBot />;
}
