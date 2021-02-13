export default [
    {
        role: 'Requestor',
        pages: [
            {
                url: 'purchase',
                actions: [
                    {
                        name: 'purchase',
                        active: true
                    }
                ]
            },
            {
                url: 'budget',
                actions: [
                    {
                        name: 'add-budget',
                        active: true
                    },
                    {
                        name: 'top-up',
                        active: true
                    }
                ]
            },
            {
                url: 'purchaserequests:uuid',
                actions: [
                    {
                        name: 'review',
                        active: false
                    },
                    {
                        name: 'approve',
                        active: true
                    },
                    {
                        name: 'quote',
                        active: true
                    }
                ]
            }
        ],
        sidebar: [
            {
                name: 'raise-request',
                active: true
            },
            {
                name: 'view-requests',
                active: true
            },
            {
                name: 'view-budgets',
                active: true
            },
            {
                name: 'add-department',
                active: false
            },
            {
                name: 'view-departments',
                active: false
            }
        ]
    },
    {
        role: 'CFO',
        pages: [
            {
                url: 'purchase',
                actions: [
                    {
                        name: 'purchase',
                        active: true
                    }
                ]
            },
            {
                url: 'budget',
                actions: [
                    {
                        name: 'add-budget',
                        active: true
                    },
                    {
                        name: 'top-up',
                        active: true
                    }
                ]
            },
            {
                url: 'purchaserequests:uuid',
                actions: [
                    {
                        name: 'review',
                        active: true
                    },
                    {
                        name: 'approve',
                        active: true
                    },
                    {
                        name: 'quote',
                        active: true
                    }
                ]
            }
        ],
        sidebar: [
            {
                name: 'raise-request',
                active: true
            },
            {
                name: 'view-requests',
                active: true
            },
            {
                name: 'view-budgets',
                active: true
            },
            {
                name: 'add-department',
                active: false
            },
            {
                name: 'view-departments',
                active: true
            }
        ]
    }
];