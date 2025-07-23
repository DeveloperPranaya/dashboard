import React, { useEffect, useState } from 'react';
const AiSummary = ({ item, endDateRaw, counterparty, contractData }) => {
    const [displayText, setDisplayText] = useState('');

    const lines = [
        `<strong>Contract Type:</strong> ${contractData.contractType || "N/A"}`,
        `<strong>Business Area:</strong> ${contractData.businessArea || "N/A"}`,
        `<strong>Value:</strong> ${contractData.value || "N/A"}`,
        `<strong>Status:</strong> ${contractData.status}`,
        `<strong>Auto-Renewal:</strong>${contractData.autoRenew}`
    ];

    const summary = `📄 A *${contractData.contractType || 'contract'}* contract was signed under the *${contractData.businessArea || 'unspecified area'}*. ` +
  `${contractData.value ? `It is valued at ${contractData.value}. ` : ''}` +
  `The contract status is **${contractData.status || 'N/A'}**.` +
  `${contractData.autoRenew !== undefined ? ` Auto-renewal is ${contractData.autoRenew ? '**enabled**' : '**disabled**'}.` : ''}`;

    useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayText((prev) => prev + summary[currentIndex]);
      currentIndex++;

      if (currentIndex === summary.length) {
        clearInterval(typingInterval);
      }
    }, 30); // adjust speed (lower is faster)

    return () => clearInterval(typingInterval);
  }, []);
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