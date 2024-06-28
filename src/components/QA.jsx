// Trong file QA.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QA = () => {
  const questions = [
    {
      id: 1,
      question: "What is a cryptocurrency exchange?",
      answer:
        "A cryptocurrency exchange is a digital market that allows users to buy and sell various cryptocurrencies such as Bitcoin, Ethereum, and Tether.",
    },
    {
      id: 2,
      question: "What products does ByteX offer?",
      answer:
        "ByteX offers various products and services in the cryptocurrency field, including spot trading, margin trading, futures trading, staking, and many other features.",
    },
    {
      id: 3,
      question: "How to buy Bitcoin and other cryptocurrencies on ByteX",
      answer:
        "To buy Bitcoin and other cryptocurrencies on ByteX, you need to create a ByteX account, deposit funds into your account, and then use those funds to purchase cryptocurrencies through spot or margin trading.",
    },
    {
      id: 4,
      question: "How to track cryptocurrency prices",
      answer:
        "You can track cryptocurrency prices on ByteX by using the available charts and price tracking tools on the ByteX website or mobile app. These charts typically provide information about the current price and fluctuations of cryptocurrencies over time.",
    },
    {
      id: 5,
      question: "How to trade cryptocurrencies on ByteX",
      answer:
        "To trade cryptocurrencies on ByteX, you need to choose the type of trading (spot, margin, futures), select the trading pair, place buy or sell orders according to your preferences, and confirm the transaction. You can also use features like stop-limit orders to manage risk.",
    },
    {
      id: 6,
      question: "What is the contract address of the Pixel token?",
      answer:
        "The contract address of the Pixel token is 0x87c0B9295E76f892604E5f0b7E4377c2361687c7.",
    }
  ];

  // Tạo state isOpen và hàm setIsOpen
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="faq-list">
        {questions.map((q) => (
          <motion.div
            key={q.id}
            layout
            transition={{ duration: 0.3, type: 'spring' }}
            className="faq-item cursor-pointer"
          >
            <motion.p
              className="question font-semibold mb-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {q.question}
            </motion.p>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  className="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {q.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style>
        {`
          .faq-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 16px;
            padding: 16px;
            cursor: pointer;
            transition: box-shadow 0.3s;
          }

          .faq-item:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .question {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .answer {
            font-size: 16px;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default QA;
