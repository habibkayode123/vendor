import BulkBudget from 'budget/budgetBulkUpload';
import React, {useEffect, useState} from 'react';
import { getBudgetByDepartment } from '../../budget/api-budget';
import auth from '../../auth/auth-helper';

import {numberWithCommas} from '../../helpers';

function BudgetBalance() {
    const [budgets, setBudgets] = useState([]);
    const [active, setActive] = useState('');

    const fetchBudgets = () => {
        getBudgetByDepartment({
            departmentId: auth.isAuthenticated().user.departmentId
        }).then(res => {
            console.log(res)
            setBudgets(res.data);
        })
    }

    const handleActive = () => {
        if (active) setActive('');
        else setActive('active')
    }

    useEffect(() => {
        fetchBudgets();
    }, [])

    return (
        <div className={'budget-sidebar ' + active} onClick={handleActive}>
            <p className="view">View Budget Balance</p>
            <p className="hide">Hide Budget Balance</p>
            {/* <h5>Budget Balances</h5> */}
            {
                budgets.map(budget => (
                    <div className="mt-3" key={budget.id}>
                        <h5>{numberWithCommas(budget.amount)}</h5>
                        <span className="budget-title">{budget.expenseType.name}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default BudgetBalance;