"use client";

import { useState } from "react";
import { api } from "~/trpc/server";

export default function BankAccount() {
    // Variables
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [userId, setUserId] = useState(0);

    // Retrieving account balances
    const getAccountBalances = api.bankAccount.getAll();
    // Get balance by user id
    // const getAccountById = api.bankAccount.getOne({id: userId});


    return (
        <div>
            
            <h1>Checking account of {name}</h1>
            <h2>Current amount available: {amount}</h2>
        </div>
    )
}