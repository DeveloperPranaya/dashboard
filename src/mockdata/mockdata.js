export const dashboardbtn = [
  { id: 1, name: "Contract View" },
  { id: 2, name: "Counterparty" },
  { id: 3, name: "Renewal Type" },
  { id: 4, name: "All" },
];

export const contractType= [
  {id:1, name:"Contracts Count by Type"},
  {id:2, name:"Status Count by Type"}
];

export const recentActivity = [
  {id:1, name:"Amendments"},
  {id:2, name:"Issues"},
  {id:3, name:"New Contracts"},
  {id:4, name:"Expired Contracts"}
];

export const header = "Sales - Business Area"

export const paragraph = "The Sales Business Area Dashboard provides a comprehensive overview of sales performance metrics, contract statuses, and key activities. Users can expect to find visual representations of sales data, including charts and graphs that highlight trends and forecasts. The dashboard also features sections for managing contracts, tracking user activities, and monitoring upcoming obligations, ensuring that all critical information is easily accessible for informed decision-making."

export const keysToInclude = ['WG001', 'WG002', 'WG003','WG006', 'WG007'];
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const counterparty = [
   { id: 1, name: "Country" },
  { id: 2, name: "Counterparty Type" },
  { id: 3, name: "Status" },
  { id: 4, name: "Timeline" },
]

export const tableHeaders = [
    {id:1, label:""},
    {id:2, label:"Contract Title"},
    {id:3, label:"Counterparty"},
    {id:4, label:"Renewal Type"},
    {id:5, label:"Contract Value"},
    {id:6, label:"Days Remaining"},
    {id:7, label:"Action"},
  ];

  // export const contractType = [
  //    {id:1, label:"Month"},
  //    {id:2, label:"Auto Renewal"},
  //    {id:3, label:"Manual Renewal"},
  //    {id:4, label:"OneTime Renewal"},
  // ]

  export const month = ["jan","feb","march","April","May", "jun","july","augest", "setpt","oct","Nov","Dec"]
    export const showFields = [
    "Contracts.ContractTitle",
    "Contracts.Counterparty",
    "Contracts.AutoRenew",
    "Contracts.ContractValue",
    "Contracts.EndDate"
  ];
