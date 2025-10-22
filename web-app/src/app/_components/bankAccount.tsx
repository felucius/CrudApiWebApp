"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function BankAccount() {
    // Variables
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [userId, setUserId] = useState("");
    const [id, setId] = useState("");
    const [amountToUpdate, setAmountToUpdate] = useState(0);

    //define functions
    const fetchAllAccounts = api.bankAccount.getAll.useQuery();
    const fetchAccountById = api.bankAccount.getOne.useQuery({userId: userId})

    const createBankAccountMutation = api.bankAccount.createBankAccount.useMutation();
    const deleteBankAccountMutation = api.bankAccount.deleteBankAccount.useMutation();
    const updateBankAccountMutation = api.bankAccount.updateBankAccount.useMutation();

    const handleCreateBankAccount = async () => {
        try{
            await createBankAccountMutation.mutateAsync({
                userId: userId,
                amount: amount
            });
            setAmount(0);
            fetchAllAccounts.refetch();
        }
        catch(error){
            console.log(error);
        }
    }

    const handleDeleteBankAccount = async () => {
        try{
            const result = await deleteBankAccountMutation.mutateAsync({
                userId: id
            });

            console.log(result);

            setId("");
            fetchAllAccounts.refetch();
        }
        catch(error){
            console.log(error);
        }
    }

    const handleUpdateBankAccount = async () => {
        try{
            const result = await updateBankAccountMutation.mutateAsync({
                userId: userId,
                amount: amountToUpdate
            });

            console.log(result);
            fetchAllAccounts.refetch();
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="mx-auto p-8">
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
            </div>

            <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => fetchAllAccounts.refetch()}
            >
                Get All bank accounts
            </button>

            {/*Get one bank account from a user */}
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Get One bank account</h2>
                <div className="mb-4 flex">
                <input
                    className="mr-2 border border-gray-300 p-2"
                    placeholder="Enter user id to get"
                    value={userId || ""}
                    onChange={(e) => setUserId(String(e.target.value))}
                />
                <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => fetchAccountById.refetch()}
                >
                    Get One bank account
                </button>
                </div>
                {fetchAccountById.data && (
                <div>
                    <p>UserId: {fetchAccountById.data?.userId}</p>
                    <p>Amount: {fetchAccountById.data?.amount}</p>
                </div>
                )}
            </div>

            {/* Create Bank account for user */}
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Create New bank account for user</h2>
                <div className="mb-4 flex">
                <input
                    className="mr-2 w-1/2 border border-gray-300 p-2"
                    placeholder="userId"
                    // value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    className="w-1/2 border border-gray-300 p-2"
                    placeholder="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                </div>

                <button
                className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={handleCreateBankAccount}
                >
                Create Bank account
                </button>
            </div>

            {/* Update user bank account */}
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Update bank account</h2>
                <div className="mb-4 flex">
                <input
                    placeholder="Enter user id to update"
                    className="mr-2 border border-gray-300 p-2"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    className="mr-2 w-1/2 border border-gray-300 p-2"
                    placeholder="Name to update"
                    value={amountToUpdate}
                    onChange={(e) => setAmountToUpdate(Number(e.target.value))}
                />
                </div>
                <button
                className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                onClick={handleUpdateBankAccount}
                >
                Update bank accounts
                </button>
            </div>

            {/* Delete bank account */}
            <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Delete bank account</h2>
                <input
                placeholder="Enter user id to delete"
                className="mr-2 border border-gray-300 p-2"
                value={id}
                onChange={(e) => setId(e.target.value)}
                />
                <button
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleDeleteBankAccount}
                >
                Delete bank account
                </button>
            </div>
        </div>
    )
}