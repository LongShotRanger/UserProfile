"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "When can I book my rental gear?",
    answer: (
      <p>
        Rentals open on the 3rd of every month for treks happening the next month. So if your trek is in May, you can book your gear from 3rd April.
      </p>
    ),
  },
  {
    question: "Can I change the shoes/jacket size at the base camp when I receive it?",
    answer: (
      <p >
        Unfortunately, no. The gear is reserved for you based on what you have booked and we may not have alternative sizes available at the basecamp.
        We advise that you book the size carefully and avoid hassles later. We are unable to issue any refunds when the wrong sizes have been booked as there is a lot of logistics involved in the backend.
      </p>
    ),
  },
  {
    question: "Is there a deposit amount for the rental gear?",
    answer: (
      <div>
        <p className="mb-2">
          We take great care of our equipment and request an economical deposit amount for all the rental equipment booked. This can be paid directly to our store manager at the basecamp. Deposit amounts vary for each total billing value. Here is a chart:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-collapse dark:border-gray-600 border-gray-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-2">Rental total billing cost range (Rs)</th>
                <th className="p-2">Deposit (Rs)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Up to 500</td>
                <td className="p-2">1000</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">500 - 1000</td>
                <td className="p-2">2000</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">1000 - 2000</td>
                <td className="p-2">3000</td>
              </tr>
              <tr className="border-t dark:border-gray-700">
                <td className="p-2">Above 2000</td>
                <td className="p-2">4000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    question: "Are these rental shoes broken in?",
    answer: (
      <p>
        All our rental shoes are top of the line and broken in. In the very slight possibility, you may receive a brand new pair. Even in this case, the shoes are designed not to give shoe bites, so don’t worry.
      </p>
    ),
  },
  {
    question: "Can I change the size of the trekking gear I ordered?",
    answer: (
      <p>
        To change the size of the ordered gear, you will have to cancel your order and re-book it. You will get a 96% refund of the amount you have paid.
      </p>
    ),
  },
  {
    question: "Can I cancel a single item/partial order from my bulk order?",
    answer: (
      <p>
        Of course. The order is available on your dashboard and you can cancel whichever item(s) you want without affecting the rest of your order.
      </p>
    ),
  },
  {
    question: "How to modify the size/quantities of rented gear?",
    answer: (
      <p>
        Size change is not possible for existing orders. You will need to cancel your current order and rebook with the correct size.<br />
        <strong>Please note:</strong> Size modification depends on the availability of the required size. If unavailable, you will have to cancel your current reservation, for which the standard cancellation policy applies.
      </p>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // To get dynamic height for smooth animation
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="space-y-0">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`${index !== 0 ? "border-t border-gray-300 dark:border-gray-700" : ""}`}
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight: isOpen ? contentRefs.current[index]?.scrollHeight : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}
                className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
