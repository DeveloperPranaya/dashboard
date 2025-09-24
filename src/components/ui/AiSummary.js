import  { useEffect, useState } from 'react';
const AiSummary = ({ contractTitle, status, renewalType, businessArea, contractValue, item, endDateRaw,  counterparty, contractData }) => {
  const [displayText, setDisplayText] = useState('');

    
const summaryLines = [
  `📄 A *${contractTitle || "contract"}* contract was signed under the *${businessArea || "unspecified area"}*.`,
  contractValue ? `💰 It is valued at $${contractValue}.` : "💰 The value has not been disclosed.",
  endDateRaw ? `📅 The term ends on ${endDateRaw}.` : "📅 The end date is not specified.",
  `📌 The contract status is **${status || "N/A"}**.`,
  renewalType ? `🔄 The renewal type is **${renewalType}**.` : "🔄 The renewal type is not defined."
];

// Final summary (multi-line string)
const summary = summaryLines.join("\n");

useEffect(() => {
  let currentIndex = 0;
  const typingInterval = setInterval(() => {
    if (currentIndex < summary.length) {
      setDisplayText((prev) => prev + summary[currentIndex]);
      currentIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 30);

  return () => clearInterval(typingInterval);
}, [summary]);


    return (

       <div
      className="text-base leading-relaxed whitespace-pre-wrap"
      dangerouslySetInnerHTML={{
        __html: String(displayText)
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>'),
      }}
    />

    );
};
export default AiSummary;


