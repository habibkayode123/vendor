export default [
  {
    role: "Requestor",
    pages: [
      {
        url: "purchase",
        actions: [
          {
            name: "purchase",
            active: true,
          },
        ],
      },
      {
        url: "budget",
        actions: [
          {
            name: "add-budget",
            active: true,
          },
          {
            name: "top-up",
            active: true,
          },
        ],
      },
      {
        url: "purchaserequests:uuid",
        actions: [
          {
            name: "review",
            active: false,
          },
          {
            name: "approve",
            active: false,
          },
          {
            name: "quote",
            active: false,
          },

          {
            name: "invoice",
            active: true,
          },
        ],
      },
    ],
    sidebar: [
      {
        name: "raise-request",
        active: true,
      },
      {
        name: "view-requests",
        active: true,
      },
      {
        name: "view-budgets",
        active: true,
      },
      {
        name: "add-department",
        active: false,
      },
      {
        name: "view-departments",
        active: false,
      },
      {
        name: "add-budget",
        active: true,
      },
      {
        name: "manage-users",
        active: false,
      },
    ],
  },
  {
    role: "Admin",
    pages: [
      {
        url: "purchase",
        actions: [
          {
            name: "purchase",
            active: true,
          },
        ],
      },
      {
        url: "budget",
        actions: [
          {
            name: "add-budget",
            active: true,
          },
          {
            name: "top-up",
            active: true,
          },
        ],
      },
      {
        url: "purchaserequests:uuid",
        actions: [
          {
            name: "review",
            active: false,
          },
          {
            name: "approve",
            active: true,
          },
          {
            name: "quote",
            active: true,
          },
        ],
      },
    ],
    sidebar: [
      {
        name: "raise-request",
        active: false,
      },
      {
        name: "view-requests",
        active: false,
      },
      {
        name: "view-budgets",
        active: false,
      },
      {
        name: "add-budget",
        active: false,
      },
      {
        name: "add-department",
        active: true,
      },
      {
        name: "view-departments",
        active: true,
      },
      {
        name: "manage-users",
        active: true,
      },
      {
        name: "add-vendors",
        active: true,
      },
      {
        name: "add-product",
        active: true,
      },
    ],
  },
  {
    role: "CFO",
    pages: [
      {
        url: "quotations-list",
        actions: [
          {
            name: "quotation",
            active: true,
          },
        ],
      },
      {
        url: "purchase",
        actions: [
          {
            name: "purchase",
            active: true,
          },
        ],
      },
      {
        url: "budget",
        actions: [
          {
            name: "add-budget",
            active: true,
          },
          {
            name: "top-up",
            active: true,
          },
        ],
      },
      {
        url: "purchaserequests:uuid",
        actions: [
          {
            name: "review",
            active: true,
          },
          {
            name: "approve",
            active: true,
          },
          {
            name: "quote",
            active: true,
          },

          {
            name: "invoice",
            active: false,
          },
        ],
      },
    ],
    sidebar: [
      {
        name: "qoutation-list",
        active: true,
      },
      {
        name: "view-requests",
        active: true,
      },
      {
        name: "view-budgets",
        active: true,
      },
      {
        name: "add-department",
        active: false,
      },
      {
        name: "view-departments",
        active: false,
      },
      {
        name: "add-budget",
        active: true,
      },
      {
        name: "manage-users",
        active: false,
      },
      {
        name: "view-qoutations",
        active: true,
      },
    ],
  },
  {
    role: "Business Unit Head",
    pages: [
      {
        url: "purchase",
        actions: [
          {
            name: "purchase",
            active: true,
          },
        ],
      },
      {
        url: "budget",
        actions: [],
      },
      {
        url: "purchaserequests:uuid",
        actions: [
          {
            name: "review",
            active: true,
          },
          {
            name: "approve",
            active: false,
          },
          {
            name: "quote",
            active: false,
          },

          {
            name: "invoice",
            active: false,
          },
        ],
      },
    ],
    sidebar: [
      {
        name: "raise-request",
        active: false,
      },
      {
        name: "view-requests",
        active: true,
      },
      {
        name: "view-budgets",
        active: true,
      },
      {
        name: "add-department",
        active: false,
      },
      {
        name: "view-departments",
        active: false,
      },
      {
        name: "add-budget",
        active: true,
      },
      {
        name: "manage-users",
        active: false,
      },
    ],
  },
];
