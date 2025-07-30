import {ID} from 'appwrite'
import type {INewUser} from "@/types";
import {account} from "@/lib/appwrite/appwrite-config.ts";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        return newAccount;
    } catch (error) {
        return error;
    }
}