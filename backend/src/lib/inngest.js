import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inggest = new Inngest({ id: "code-interview" });
    //1:56:00
const syncUser = inggest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async({event}) => {
        await connectDB()
        const {id, email_addresses, first_name, last_name, imgae_url} = event.data
        const newUser = {
            clerkId: id,
            email:email_addresses[0]?.email_address,
            name:`${first_name || ""} ${last_name || ""}`,
            profileImage:imgae_url
        }
        await User.create(newUser)
    }
)

const deleteUserFromDB = inggest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.deleted"},

    async({event}) => {
        await connectDB()
        const {id} = event.data
        await User.deleteOne({clerkId: id});
    }
)

export const functions = [syncUser,deleteUserFromDB];