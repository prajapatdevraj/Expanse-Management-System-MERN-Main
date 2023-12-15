import React from 'react'
import { Progress } from 'antd';
const Analytics = ({ allTransection }) => {
    //Category
    const categories=['salary','medical','designing','petrol','food','movie','fee','tax','bill']

    // total transections
    const totalTransaction = allTransection.length //length of transection
    const totalIncomeTransactions = allTransection.filter((transaction) => transaction.type === 'income').length;   // this will give length because we only need number of transection not the value
    const totalExpenseTansactions = allTransection.filter((transaction) => transaction.type === 'expense').length; // this will give length because we only need number of transection not the value
    const totalIncomePercent = (totalIncomeTransactions / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTansactions / totalTransaction) * 100;

    // total turnover
    const totalTurnover = allTransection.reduce((acc, transaction) => acc + transaction.amount, 0); //accumulate function with initial 0
    const totalIncomeTurnover = allTransection.filter((transaction) => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = allTransection.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100
    return (
        <>
            <div className='row m-3'>
                {/* transection col */}
                <div className='col-md-3 col-sm-6'>
                    <div className='card border'>
                        <div className='card-header'>
                            Total Transaction : {totalTransaction}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTransactions}</h5>
                            <h5 className='text-danger'>Expanse : {totalExpenseTansactions}</h5>
                            {/* <p>Total Income %: {totalIncomePercent}%</p>
                            <p>Total Expense %: {totalExpensePercent}%</p> */}
                            <div className='d-flex'>
                                <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)}></Progress>    {/* .toFixed(0) this will remove decimal values */}
                                <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)}></Progress>    {/* .toFixed(0) this will remove decimal values */}
                            </div>

                        </div>

                    </div>
                </div>
                {/* turnOver col */}
                <div className='col-md-3 col-sm-6'>
                    <div className='card border'>
                        <div className='card-header'>
                            Total TurnOver : {totalTurnover}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expanse : {totalExpenseTurnover}</h5>
                            <div className='d-flex'>
                                <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}></Progress>    {/* .toFixed(0) this will remove decimal values */}
                                <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)}></Progress>    {/* .toFixed(0) this will remove decimal values */}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* cateogry wise Row */}
            <div className='row m-3 mt-3'>
                {/* catogry wise income */}
                <div className='col-md-3 col-sm-6'>
                    <h4>Categorywise Income</h4>
                    {
                        categories.map((category) =>{
                            const amount = allTransection.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc,transaction)=>acc + transaction.amount,0)
                            return (
                                amount > 0 && (<div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                                    </div>
                                </div>)

                            )
                        })
                    }

                </div>
                {/* catogry wise expanse */}
                <div className='col-md-3 col-sm-6'>
                    <h4>Categorywise Expanse</h4>
                    {
                        categories.map((category) =>{
                            const amount = allTransection.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc,transaction)=>acc + transaction.amount,0)
                            return (
                                amount > 0 && (<div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>
                                    </div>
                                </div>)

                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Analytics;
