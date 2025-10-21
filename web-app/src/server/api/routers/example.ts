// Z is a library to validate the input and output of the functions
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Is a schema that takes an object with an ID as string
const idSchema = z.object({ id: z.string() });

// Is a schema that takes an object with a name and an email as strings 
const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

// Is a schema that takes an object with id, name and email as strings
const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

// Creates a router. It takes an object with the functions we want to expose
export const exampleRouter = createTRPCRouter({

    // Public procedure is a function that takes a schema and returns a function that takes a function

    //get all users
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.user.findMany();
    }),

    //get user by id
    getOne: publicProcedure
        .input(idSchema)
        .query(({ input, ctx }) => {
        return ctx.db.user.findUnique({
            where: idSchema.parse(input),
        });
    }),

    //create user
    createUser: publicProcedure
        .input(userSchema)
        .mutation(({ input, ctx }) => {
        return ctx.db.user.create({
            data: userSchema.parse(input),
        });
    }),

    //update user
    updateUser: publicProcedure
        .input(userUpdateSchema)
        .mutation(({ input, ctx }) => {
        return ctx.db.user.update({
            where: {
            id: input.id.toString(),
            },
            data: userUpdateSchema.parse(input),
        });
    }),

    //delete user
    deleteUser: publicProcedure
        .input(idSchema)
        .mutation(({ input, ctx }) => {
        return ctx.db.user.delete({
            where: idSchema.parse(input),
        });
    }),
});