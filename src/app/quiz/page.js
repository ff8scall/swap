import React from 'react';
import SwapQuiz from '@/components/swap/SwapQuiz';

export const metadata = {
  title: 'Swap Master Quiz | Test Your Culinary Science Knowledge',
  description: 'Can you guess the best scientific substitute for these ingredients? Play now and become a Swap Master.',
};

export default function QuizPage() {
  return (
    <main>
      <SwapQuiz />
    </main>
  );
}
