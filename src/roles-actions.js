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
                        active: false
                    },
                    {
                        name: 'quote',
                        active: false
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
            },
            {
                name: 'add-budget',
                active: true
            },
            {
                name: 'manage-users',
                active: true
            }
        ]
    },
    {
        role: 'Admin',
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
                active: false
            },
            {
                name: 'view-requests',
                active: false
            },
            {
                name: 'view-budgets',
                active: false
            },
            {
                name: 'add-budget',
                active: false
            },
            {
                name: 'add-department',
                active: true
            },
            {
                name: 'view-departments',
                active: true
            },
            {
                name: 'manage-users',
                active: true
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
                active: false
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
            },
            {
                name: 'add-budget',
                active: true
            },
            {
                name: 'manage-users',
                active: false
            }
        ]
    }
];