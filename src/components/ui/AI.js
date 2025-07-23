

function aiInsightsAction(contractRowKey) {
    console.log(`🤖 AI Insights action for contract: ${contractRowKey}`);

    if (!contractRowKey) {
        showSnackbar('No contract ID available for AI insights.', 'error');
        return;
    }

    // Show loading state

    // Show AI insights dialog immediately and gather data
    showAIInsightsDialog(contractRowKey);
}

// Function to show AI Insights dialog
function showAIInsightsDialog(contractId) {
    // Create dialog HTML
    const dialogHTML = `
        <div id="aiInsightsModal" class="modal" style="display: block; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
            <div class="modal-content" style="background-color: #fefefe; margin: 8% auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 8px; width: 60%; max-width: 700px; max-height: 80vh; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div class="modal-body" style="padding: 16px; max-height: 60vh; overflow-y: auto;">
                    <div id="aiInsightsContent">
                        <div class="loading-state" style="text-align: center; padding: 20px;">
                            <div class="typing-container">
                                <div class="typing-effect">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <p style="color: #666; font-size: 14px; margin: 15px 0 0 0;">Analyzing contract data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
            .typing-container {
                padding: 0;
                font-family: inherit;
                text-align: left;
                max-width: 100%;
                margin: 0;
            }
            .typing-text {
                color: #333;
                font-size: 14px;
                white-space: pre-wrap;
                overflow-wrap: break-word;
                min-height: 100px;
                line-height:0.5
            }
            .typing-cursor {
                display: inline-block;
                width: 8px;
                height: 14px;
                background-color: #333;
                margin-left: 2px;
                animation: blink 1s infinite;
                vertical-align: middle;
            }
            .insight-section {
                background: #ffffff;
                border: 1px solid #e0e0e0;
                padding: 20px;
                margin: 0;
                border-radius: 4px;
            }
            .insight-section h3 {
                color: #333333;
                margin: 0 0 16px 0;
                font-size: 17px;
                font-weight: 600;
                padding-bottom: 0;
            }
            .insight-section h2 {
                color: #333333;
                margin: 24px 0 12px 0;
                font-size: 17px;
                font-weight: 600;
                padding-bottom: 0;
            }
            .insight-section ul {
                margin: 0;
                padding-left: 0;
                list-style-type: none;
            }
            .insight-section li {
                margin: 12px 0;
                line-height:1.5;
                position: relative;
                padding-left: 22px;
                max-width: 100%;
            }
            .insight-section li:before {
                content: "•";
                color: #333;
                font-weight: bold;
                font-size: 18px;
                position: absolute;
                left: 0;
                top: 0;
            }
            .data-source {
                background: #f5f5f5;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                padding: 15px;
                margin: 15px 0;
                font-size: 14px;
            }
            .data-source h4 {
                color: #333;
                margin: 0 0 10px 0;
                font-size: 16px;
                font-weight: 600;
            }
            .ai-content {
                line-height: 0.5;
                font-size: 14px;
                color: #333;
            }
            .ai-content h3 {
                color: #333;
                margin: 24px 0 12px 0;
                font-size: 16px;
                font-weight: 600;
            }
            .ai-content .highlight {
                font-weight: 700;
                color: #000;
            }
            .ai-content .highlight-important {
                font-weight: 700;
                color: #000;
            }
            .ai-content .date-highlight {
                font-weight: 700;
            }
            .point-heading {
                font-weight: 600;
                color: #333;
                display: inline;
                margin-right: 4px;
            }
            .toggle-data-btn {
                background: #eeeeee;
                border: 1px solid #cccccc;
                padding: 6px 12px;
                border-radius: 3px;
                color: #333;
                cursor: pointer;
                font-size: 13px;
            }
            .toggle-data-btn:hover {
                background: #dddddd;
            }
        </style>
    `;

    // Remove existing modal if any
    $('#aiInsightsModal').remove();

    // Add dialog to body
    $('body').append(dialogHTML);

    // Close dialog events
    $('#aiInsightsModal .close, #aiInsightsModal').click(function (e) {
        if (e.target === this) {
            $('#aiInsightsModal').remove();
        }
    });

    // Prevent modal content clicks from closing dialog
    $('#aiInsightsModal .modal-content').click(function (e) {
        e.stopPropagation();
    });

    // Start gathering data and generating insights
    gatherContractDataAndGenerateInsights(contractId);
}

// Function to gather data from WG011 and WG013 and generate AI insights
async function gatherContractDataAndGenerateInsights(contractId) {
    try {
        console.log(`🔍 Gathering data for contract: ${contractId}`);
        console.log('📊 Global outputData available:', !!outputData);
        console.log('📊 OutputData keys:', Object.keys(outputData || {}));

        let contractData = null;
        let additionalData = null;

        // Step 1: Try to find contract in WG011 first
        if (outputData && outputData['WG011']) {
            console.log('📊 Searching in WG011 data...');
            contractData = await searchContractInWG011(contractId);

            if (contractData) {
                console.log('✅ Found contract data in WG011:', {
                    ContractTitle: contractData.ContractTitle,
                    ContractID: contractData.ContractID,
                    Counterparty: contractData.Counterparty,
                    Status: contractData.Status
                });
            }
        } else {
            console.log('❌ WG011 data not available in outputData');
        }

        // Step 2: Get data from WG013 (always try to get additional context)
        if (outputData && outputData['WG013'] || window.WG013Data) {
            console.log('📊 Gathering data from WG013...');
            additionalData = await getContractFromWG013(contractId);

            if (additionalData) {
                console.log('✅ Found additional data in WG013:', {
                    ContractTitle: additionalData.ContractTitle || additionalData['Contracts.ContractTitle'],
                    Period: additionalData._renewalPeriod,
                    DataSource: additionalData._dataSource
                });
            }
        } else {
            console.log('❌ WG013 data not available');
        }

        // Step 3: If no data found in WG011, use WG013 data as primary
        if (!contractData && additionalData) {
            console.log('📋 Using WG013 data as primary source');
            contractData = additionalData;
            additionalData = null;
        }

        // Step 4: Generate AI insights
        if (contractData || additionalData) {
            console.log('🤖 Proceeding with AI insights generation');
            await generateAIInsights(contractId, contractData, additionalData);
        } else {
            console.log('❌ No contract data found in any widget');
            throw new Error('No contract data found in available widgets');
        }

    } catch (error) {
        console.error('❌ Error gathering contract data:', error);

        const errorHTML = `
            <div class="error-state" style="text-align: center; padding: 40px;">
                <div style="font-size: 48px; color: #dc3545; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: #dc3545; margin: 0 0 15px 0;">Unable to Generate AI Insights</h3>
                <p style="color: #666; margin: 0 0 10px 0;">${error.message}</p>
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 15px; margin: 20px 0; text-align: left;">
                    <strong>Debug Information:</strong><br>
                    Contract ID: ${contractId}<br>
                    OutputData Available: ${!!outputData}<br>
                    WG011 Available: ${!!(outputData && outputData['WG011'])}<br>
                    WG013 Available: ${!!(outputData && outputData['WG013'])}<br>
                    WG013 Window Data: ${!!window.WG013Data}
                </div>
                <button onclick="$('#aiInsightsModal').remove()" style="background: #dc3545; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">Close</button>
            </div>
        `;

        $('#aiInsightsContent').html(errorHTML);
        showSnackbar('Failed to gather contract data for AI insights.', 'error');
    }
}

// Function to search for contract in WG011 data
async function searchContractInWG011(contractId) {
    return new Promise((resolve) => {
        try {
            console.log('🔍 Searching WG011 for contract:', contractId);
            console.log('📊 Available outputData keys:', Object.keys(outputData));

            const wg011Data = outputData['WG011'];
            if (!wg011Data) {
                console.log('❌ WG011 data not found in outputData');
                resolve(null);
                return;
            }

            console.log('📊 WG011 data structure:', {
                hasResult: !!wg011Data.Result,
                hasData: !!(wg011Data.Result && wg011Data.Result.Data),
                dataType: wg011Data.Result && wg011Data.Result.Data ? (Array.isArray(wg011Data.Result.Data) ? 'array' : typeof wg011Data.Result.Data) : 'undefined'
            });



            if (!wg011Data.Result || !wg011Data.Result.Data) {
                console.log('❌ WG011 data structure invalid');
                resolve(null);
                return;
            }

            let foundContract = null;

            // WG011 has data as array in Result.Data
            if (Array.isArray(wg011Data.Result.Data)) {
                console.log(`🔍 Searching through ${wg011Data.Result.Data.length} contracts in WG011`);

                foundContract = wg011Data.Result.Data.find(contract => {
                    // Search by various possible contract ID fields
                    const contractMatches =
                        contract.ContractID === contractId ||
                        contract._ContractID === contractId ||
                        contract._PrimaryRowKey === contractId ||
                        contract._SecondaryRowKey === contractId ||
                        contract.RowKey === contractId ||
                        contract['Contracts.RowKey'] === contractId;

                    if (contractMatches) {
                        console.log('✅ Found matching contract:', {
                            ContractID: contract.ContractID,
                            _ContractID: contract._ContractID,
                            _PrimaryRowKey: contract._PrimaryRowKey,
                            _SecondaryRowKey: contract._SecondaryRowKey,
                            RowKey: contract.RowKey,
                            ContractTitle: contract.ContractTitle
                        });
                    }

                    return contractMatches;
                });

                if (foundContract) {
                    foundContract = { ...foundContract, _dataSource: 'WG011.Result.Data' };
                    console.log('✅ Contract found in WG011:', foundContract.ContractTitle);
                } else {
                    console.log('❌ Contract not found in WG011 array');
                    // Debug: Show first few contracts to understand the data
                    if (wg011Data.Result.Data.length > 0) {
                        console.log('🔍 Sample contracts in WG011:', wg011Data.Result.Data.slice(0, 3).map(c => ({
                            ContractID: c.ContractID,
                            _ContractID: c._ContractID,
                            ContractTitle: c.ContractTitle
                        })));
                    }
                }
            } else {
                // If data is an object with keys, search through each key
                console.log('🔍 WG011 data is object, searching through keys:', Object.keys(wg011Data.Result.Data));
                Object.keys(wg011Data.Result.Data).forEach(key => {
                    const dataArray = wg011Data.Result.Data[key];
                    if (Array.isArray(dataArray) && !foundContract) {
                        const contract = dataArray.find(item =>
                            item.ContractID === contractId ||
                            item._ContractID === contractId ||
                            item._PrimaryRowKey === contractId ||
                            item._SecondaryRowKey === contractId ||
                            item.RowKey === contractId ||
                            item['Contracts.RowKey'] === contractId
                        );
                        if (contract) {
                            foundContract = { ...contract, _dataSource: `WG011.${key}` };
                        }
                    }
                });
            }

            resolve(foundContract);

        } catch (error) {
            console.error('❌ Error searching WG011:', error);
            resolve(null);
        }
    });
}

// Function to get contract data from WG013
async function getContractFromWG013(contractId) {
    return new Promise((resolve) => {
        try {
            let foundContract = null;

            // Check if WG013 data is available in window.WG013Data
            if (window.WG013Data && window.WG013Data.renewalData) {
                console.log('🔍 Searching WG013 renewal data...');

                // Search through all periods in WG013
                Object.keys(window.WG013Data.renewalData).forEach(period => {
                    const contracts = window.WG013Data.renewalData[period];
                    if (Array.isArray(contracts)) {
                        const contract = contracts.find(item =>
                            item['Contracts.RowKey'] === contractId ||
                            item.ContractID === contractId ||
                            item._ContractID === contractId ||
                            item.RowKey === contractId
                        );
                        if (contract && !foundContract) {
                            foundContract = { ...contract, _dataSource: `WG013.${period}`, _renewalPeriod: period };
                        }
                    }
                });
            }

            // Also check outputData for WG013
            if (!foundContract && outputData['WG013']) {
                console.log('🔍 Searching WG013 outputData...');
                const wg013Data = outputData['WG013'];
                if (wg013Data.Result && wg013Data.Result.Data) {
                    Object.keys(wg013Data.Result.Data).forEach(key => {
                        const dataArray = wg013Data.Result.Data[key];
                        if (Array.isArray(dataArray)) {
                            const contract = dataArray.find(item =>
                                item['Contracts.RowKey'] === contractId ||
                                item.ContractID === contractId ||
                                item._ContractID === contractId ||
                                item.RowKey === contractId
                            );
                            if (contract && !foundContract) {
                                foundContract = { ...contract, _dataSource: `WG013.${key}` };
                            }
                        }
                    });
                }
            }

            console.log(foundContract ? '✅ Contract found in WG013' : '❌ Contract not found in WG013');
            resolve(foundContract);

        } catch (error) {
            console.error('❌ Error searching WG013:', error);
            resolve(null);
        }
    });
}

// Function to generate AI insights using Mistral
async function generateAIInsights(contractId, primaryData, additionalData) {
    try {
        console.log('Generating AI insights with...');

        // Prepare data for Mistral
        const dataForAnalysis = {
            contractId: contractId,
            primaryData: primaryData,
            additionalData: additionalData,
            timestamp: new Date().toISOString()
        };

        console.log('📤 Data prepared for Mistral analysis:', dataForAnalysis);

        // Mistral API key and endpoint
        const MISTRAL_API_KEY = 'uH2g6GNkhq3cgYm4nsYsR4ONczi2wFJ3';
        const MISTRAL_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';

        // Show loading state in case API takes time
        $('#aiInsightsContent').html(`
            <div class="loading-state" style="text-align: center; padding: 40px;">
                <div class="typing-container">
                    <div class="typing-effect">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p style="color: #666; font-size: 16px; margin: 20px 0 0 0;">Generating Insights....Please Hang on.</p>
                </div>
            </div>
        `);

        // Make API call to Mistral
        try {
            const response = await fetch(MISTRAL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MISTRAL_API_KEY}`
                },
                body: JSON.stringify({
                    model: "mistral-large-latest",
                    messages: [
                        {
                            role: "system",
                            content: "You are a contract analysis expert. Analyze the provided contract data and provide comprehensive, structured insights."
                        },
                        {
                            role: "user",
                            content: generatePromptForLLM(dataForAnalysis)
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 1500
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ Mistral API error:', errorData);
                throw new Error(`Mistral API error: ${response.status}`);
            }

            const result = await response.json();
            const insights = result.choices[0].message.content;

            // Display the AI-generated insights
            displayAIGeneratedInsights(contractId, insights, primaryData, additionalData);

        } catch (error) {
            console.error('❌ Error with Mistral API:', error);
            throw error;
        }

    } catch (error) {
        console.error('❌ Error generating AI insights:', error);

        // Fall back to displaying gathered data
        displayContractInsights(contractId, primaryData, additionalData);
    }
}

// Function to generate prompt for Mistral
function generatePromptForLLM(dataForAnalysis) {
    return `
        As a contract analysis expert, please analyze the following contract data and provide comprehensive insights:
        
        Contract ID: ${dataForAnalysis.contractId}
        
        Primary Contract Data:
        ${JSON.stringify(dataForAnalysis.primaryData, null, 2)}
        
        Renewal Activity:
        ${JSON.stringify(dataForAnalysis.additionalData, null, 2)}

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
}

// Function to display AI-generated insights from Mistral with typing animation
function displayAIGeneratedInsights(contractId, insights, primaryData, additionalData) {
    // Get contract title if available
    const contractTitle = primaryData && (primaryData.ContractTitle || primaryData['Contracts.ContractTitle'])
        ? (primaryData.ContractTitle || primaryData['Contracts.ContractTitle'])
        : (additionalData && (additionalData.ContractTitle || additionalData['Contracts.ContractTitle'])
            ? (additionalData.ContractTitle || additionalData['Contracts.ContractTitle'])
            : `Contract Analysis`);

    // First create the container structure
    const containerHTML = `
        <div class="insights-container">
            <div class="insight-section">
                <h3>${contractTitle}</h3>
                <div class="typing-container" style="padding: 0;">
                    <div class="typing-text" id="typingContent"></div>
                    <span class="typing-cursor"></span>
                </div>
            </div>
        </div>
        
        <div style="text-align: right; margin-top: 15px;">
            <button onclick="$('#aiInsightsModal').remove()" style="background: #333; color: white; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;">Close</button>
        </div>
    `;

    // Display the container first
    $('#aiInsightsContent').html(containerHTML);

    // Format the insights content
    const formattedInsights = formatMistralInsights(insights);

    // Create plain text version for typing animation (strip HTML)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formattedInsights;
    const plainTextInsights = tempDiv.textContent || tempDiv.innerText || "";

    // Start typing animation
    const typingSpeed = 15; // Milliseconds per character (more natural reading speed)
    const typingBatchSize = 2; // Process characters per tick for natural look
    let charIndex = 0;
    const typeWriter = () => {
        if (charIndex < formattedInsights.length) {
            // Add next batch of characters to the container
            const nextIndex = Math.min(charIndex + typingBatchSize, formattedInsights.length);
            document.getElementById('typingContent').innerHTML = formattedInsights.substring(0, nextIndex);
            charIndex = nextIndex;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Typing animation complete
            document.querySelector('.typing-cursor').style.display = 'none';
            showSnackbar('AI insights generated successfully!', 'success');
        }
    };

    // Start typing after a brief pause
    setTimeout(typeWriter, 300);
}
apps-fileview.texmex_20250619.00_p0
AI BLOCK CODE.txt
Displaying AI BLOCK CODE.txt.