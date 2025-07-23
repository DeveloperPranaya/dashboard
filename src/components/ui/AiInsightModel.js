// AIInsightsModal.jsx
import React, { useEffect, useState } from 'react';
import './AIInsightsModal.css';

export default function AIInsightsModal({ contractId, outputData, onClose }) {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wg011Data = outputData?.WG011?.Result?.Data || [];
        const wg013Data = outputData?.WG013?.Result?.Data || {};
        const wg013WindowData = window?.WG013Data?.renewalData || {};

        const findContract = (data) => {
          if (Array.isArray(data)) {
            return data.find(
              c => [c.ContractID, c._ContractID, c._PrimaryRowKey, c._SecondaryRowKey, c.RowKey, c['Contracts.RowKey']].includes(contractId)
            );
          }
          return null;
        };

        let primary = findContract(wg011Data);
        if (!primary) {
          for (const key in wg011Data) {
            primary = findContract(wg011Data[key]);
            if (primary) break;
          }
        }

        let additional = null;
        for (const period in wg013WindowData) {
          const contract = findContract(wg013WindowData[period]);
          if (contract) {
            additional = { ...contract, _renewalPeriod: period };
            break;
          }
        }

        if (!primary) {
          for (const key in wg013Data) {
            const contract = findContract(wg013Data[key]);
            if (contract) {
              primary = contract;
              break;
            }
          }
        }

        if (!primary && !additional) throw new Error('No contract data found');

        const prompt = generatePrompt(contractId, primary, additional);
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_MISTRAL_API_KEY`
          },
          body: JSON.stringify({
            model: "mistral-large-latest",
            messages: [
              {
                role: 'system',
                content: 'You are a contract analysis expert. Analyze the provided contract data and provide comprehensive, structured insights.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.3,
            max_tokens: 1500
          })
        });

        if (!response.ok) throw new Error('Mistral API error');

        const result = await response.json();
        const aiText = result?.choices?.[0]?.message?.content;
        setInsights(aiText);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [contractId, outputData]);

  const generatePrompt = (contractId, primary, additional) => `
    As a contract analysis expert, please analyze the following contract data and provide comprehensive insights:

    Contract ID: ${contractId}
    
    Primary Contract Data:
    ${JSON.stringify(primary, null, 2)}

    Renewal Activity:
    ${JSON.stringify(additional, null, 2)}

    Please provide a CLEAN AND CONCISE SUMMARY structured in clear sections.
    Format as a CONTRACT SUMMARY with bullet points exactly like this example:

    # Renewal Information
    • The contract's renewal type is Manual and was last renewed on **2024-01-01** for the period of one year.
    • The term end date is **2024-12-31**, and the contract does not have an auto-renewal clause.
    • Renewal recommendations: The contract should be reviewed well before **2024-12-31** to decide on renewal options.

    Important instructions:
    - Structure exactly like the example above - main heading followed by bullet points.
    - Each bullet should be 2-3 lines only.
    - Use bullet points (•) not dashes.
    - **Bold ONLY dates and critical values**, nothing else.
    - Keep sentences clear and simple.
    - Don't use any introductory text before bullets.
    - Don't mention about the WidgetId for example WG001 or WG013.
    - Don't include any data source information.
    - Focus on key insights, not exhaustive details.
    - Highlight important dates and values using **bold**.  
    - Data which is the part of XML - always show that under the heading "Renewal Activity".
    - Try to give more summary as possible.
  `;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-body">
          {loading ? (
            <div className="loading">Generating AI Insights...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="insights">
              <h3>AI Insights for Contract</h3>
              <pre>{insights}</pre>
            </div>
          )}
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
} 
