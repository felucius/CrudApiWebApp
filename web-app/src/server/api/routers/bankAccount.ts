// Z is a library to validate the input and output of the functions
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({
    id: z.number().int()
});

const userIdSchema = z.object({
    userId: z.string().uuid()
});

const bankAccountSchema = z.object({
    userId: z.string().uuid(),
    amount: z.number().int()
})

// Create a router for the bank account methods
export const bankAccountRouter = createTRPCRouter({
    // Get all accounts
    getAll: publicProcedure.query(({ctx}) => {
        const accounts = ctx.db.bankAccount.findMany();
        return accounts;
    }),

    // Get account by ID
    getOne: publicProcedure
        .input(userIdSchema)
        .query(({input, ctx}) => {
            const account = ctx.db.bankAccount.findFirst({
                where: {userId: input.userId},
            });

            return account;
    }),

    // Create account
    createBankAccount: publicProcedure
        .input(bankAccountSchema)
        .mutation(({input, ctx}) => {
            const accountCreated = ctx.db.bankAccount.create({
                data: bankAccountSchema.parse(input),
            });

            return accountCreated;
    }),

    // Update account


    // Delete account
    deleteBankAccount: publicProcedure
        .input(idSchema)
        .mutation(({input, ctx}) => {
        return ctx.db.bankAccount.delete({
            where: idSchema.parse(input)
        });
    }),
});