import { useEffect, useState } from 'react';

const AiSummary = ({ contractTitle, status, renewalType, businessArea, contractValue, item, endDateRaw, counterparty, contractData }) => {

  const [displayText, setDisplayText] = useState('');

  // Safe values to avoid undefined
  const safeContractTitle = contractTitle ?? "";
  const safeBusinessArea = businessArea ?? "";
  const safeStatus = status ?? "";
  const safeRenewalType = renewalType ?? "";
  const safeContractValue = contractValue ?? "";
  const safeEndDate = new Date(endDateRaw.split("T")[0]).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    ) ?? "";

  // Build summary lines
  const summaryLines = [
    `📄 A *${safeContractTitle || "contract"}* contract was signed under the *${safeBusinessArea || "unspecified area"}*.`,
    safeContractValue
      ? `💰 It is valued at $${safeContractValue}.`
      : "💰 The value has not been disclosed.",
    safeEndDate
      ? `📅 The term ends on ${safeEndDate}.`
      : "📅 The end date is not specified.",
    `📌 The contract status is **${safeStatus || "N/A"}**.`,
    safeRenewalType
      ? `🔄 The renewal type is **${safeRenewalType}**.`
      : "🔄 The renewal type is not defined."
  ];

  // Final summary as a single string
  const summary = summaryLines.join("\n");

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= summary.length) {
        setDisplayText(summary.substring(0, currentIndex));
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
