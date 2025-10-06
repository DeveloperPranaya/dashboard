export const dashboardbtn = [
  { id: 1, name: "Contract Value" , desc:"Shows the top 10 counterparties ranked by total contract value."},
  { id: 2, name: "Counterparty Type", desc:"Shows the total number of counterparties, organized by their respective counterparty types." },
  { id: 3, name: "Renewal Type", desc:"Shows the count of contracts by renewal type (Auto or Manual)" },
  { id: 4, name: "Region", desc:"Shows the count of contracts group by renewal type (Automatic or Manual)" },
];

export const togglebuttonName = [{id:1, name:"Overview"}, {id:2, name:"Activity Details"}] 

export const contractType= [
  {id:1, name:"Contracts Count by Type"},
  {id:2, name:"Status Count by Type"}
];

export const recentActivity = [
  {id:1, name:"All"},
  {id:2, name:"Amendments"},
  {id:3, name:"Issues"},
  {id:4, name:"New Contracts"},
  {id:5, name:"Expired Contracts"}
];

export const obligations = [
  {id:1, name:"All"},
  {id:2, name:"Upcoming"},
  {id:3, name:"Delayed"},
  {id:4, name:"Partial"},
  {id:5, name:"Complete"},
  {id:6, name:"Cancelled"}
]

export const upcomingMileStone = [
  {id:1, name:"All"},
  {id:2, name:"Upcoming"},
  {id:3, name:"Delayed"}, 
  {id:4, name:"Complete"},
]

export const header = "Sales - Business Area"

export const paragraph = "The Sales Business Area Dashboard provides a comprehensive overview of sales performance metrics, contract statuses, and key activities. Users can expect to find visual representations of sales data, including charts and graphs that highlight trends and forecasts. The dashboard also features sections for managing contracts, tracking user activities, and monitoring upcoming obligations, ensuring that all critical information is easily accessible for informed decision-making."

export const keysToInclude = ['WG001', 'WG003','WG006'];

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const counterparty = [
  { name: "By Counterparty Type", key: "CounterpartyType" },
  { name: "By Country", key: "Country" },
  { name: "By Status", key: "Status" },
];

export const tableHeaders = [
  { id: 1, label: "" },
  { id: 2, label: "Contract Title", key: "Contracts.ContractTitle", sortable: true },
  { id: 3, label: "Counterparty", key: "Contracts.Counterparty", sortable: true },
  { id: 4, label: "Region", key: "Contracts.Region" },
  { id: 5, label: "Renewal Type" },
  {id: 6, label: "CounterParty Type" },
  { id: 7, label: "Contract Value", key: "Contracts.ContractValue", sortable: true },
  { id: 8, label: "Days Remaining" },
  { id: 9, label: "Action" },
];

export const counterTypeTableHeader = [
  { id: 1, label: "Contract Title" },
  { id: 2, label: "Counterparty Name"},
  { id: 3, label: "Region" },
  { id: 4, label: "Renewal Type" },
  { id: 5, label: "Contract Value"},
  { id: 6, label: "Status" },
  { id: 7, label: "Creation Date" },
  { id: 8 , label: "Termination Date" },
];

export const regionTableHeader = [
  { id: 1, label: "Contract Title" },
  { id: 2, label: "Counterparty Name",},
  { id: 3, label: "Renewal Type" },
  { id: 4, label: "Contract Value" },
  { id: 5, label: "Status" },
  { id: 6, label: "Creation Date" },
  { id: 7 , label: "Termination Date" },
]

export const renewalTableHeader = [
  { id: 1, label: "Contract Title"},
  { id: 2, label: "Counterparty Name"},
  { id: 3, label: "Region"},
  { id: 4, label: "Contract Value"},
  { id: 5, label: "Status" },
  { id: 6, label: "Creation Date" },
  { id: 7 , label: "Termination Date" },
]

export const ctdTableHeader = [
  { id: 1, label: "Contract Title" },
  { id: 2, label: "Counterparty Name" },
  { id: 3, label: "Created By"},
  { id: 4, label: "Status" },
  { id: 5, label: "Creation Date" },
]

export const counterpartyHeader = [
  { id: 1, label: "Global/Regional" },
  { id: 3, label: "Counterparty Name" },
  { id: 4, label: "Counterparty Type" },
  {id: 5, label: "Country"},
   { id: 6, label: "Status" },
  { id: 7, label: "Creation Date" },
]

  export const month = ["jan","feb","march","April","May", "jun","july","augest", "setpt","oct","Nov","Dec"]
    export const showFields = [
    "Contracts.ContractTitle",
    "Contracts.Counterparty",
    "Contracts.AutoRenew",
    "Contracts.ContractValue",
    "Contracts.EndDate"
  ];

  export const contractValue = [
    { label: "Below $20,000", key: "below-20000" },
    { label: "$20,001 to $49,999", key: "20001-49999" },
    { label: "$50,001 to $99,999", key: "50001-99999" },
    { label: "$100,000 and above", key: "100000-above" }
  ];

  export const Region = [
    {label:"No Data available Right now"}
  ];

  export const CounterPartyType = [
    {label:"No Data available Right now"}
  ]

   export const renewalType = [
    { label: "Auto Renewal", key: "Yes" },
    { label: "Manual", key: "No" },
  ];

  export const dropdownData = [
    "Every 30 Minute (Default)",
    "Every 1 Hour",
    "Every 24 Hour",
  ];

  const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;
  
  export const businessAreaDropdowmAPI = `${API_BASE_URL}/Dashboard/business-areas?rowKey=THEOEXvz&userName=Santosh%20Dutta#`
 
  export const redirectToeContract = "https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Pipeline?SPHostUrl=https%3A%2F%2Fecontracts.sharepoint.com%2Fsites%2FKoztracts"
   
  export const dashoboardLink = "/";
  export const mileStoneStatusApi = `${API_BASE_URL}/Dashboard/update-milestone-status`
 
  export const obligationStatusApi = `${API_BASE_URL}/Dashboard/update-obligation-status`
 
  export const apiSummeryAPI = `${API_BASE_URL}/Dashboard/generate-ai-insights`
  
  export const ITEMS_PER_PAGE = 10;
  export const aboutDesc = "This dashboard summarizes key contract metrics, including renewals, contract types, obligations, milestones, and signatures, across global and selected business areas.";
  export const contractRenewalInfo = "This section displays the number of contracts set to expire within the next 120 days, segmented into time ranges. It helps you monitor upcoming renewals and prioritize actions.";
  export const renewlTypeInfo = "Visualizes upcoming renewals categorized by business area and renewal type (e.g., Auto-renewal, Manual). Use the dropdown to select a different business area";
  export const newContractDesc = "This section shows the count of newly created contracts that are still in the pipeline. It reflects the onboarding activity for the current and previous months, as well as the year-to-date total.";
  export const contactSigDesc = "This area shows the number of contracts that are in the signature process (status: 'Signed', 'Awaiting Signatures', or 'Ready for Signature'). It helps you monitor the pace of signatures and legal throughput.";
  export const activeContractDesc = "This summary shows all contracts with an active status (including 'Up for Renewal' and 'About to Expire'). It helps you track the overall health of your contract portfolio.";
  export const businessAreaSetting = "Choose which Business Area’s data will appear across all dashboard widgets after you select the Business Area. ";
  export const globalAutoRefreshSetting = "Set how often the Global Dashboard automatically refreshes with the latest data. Choose shorter intervals for real-time tracking.";
  export const businessAreaAutoRefreshSetting = "Set the automatic refresh frequency for all Business Area Dashboards. This can be different from the Global Dashboard refresh interval.";
