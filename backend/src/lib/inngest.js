import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "code-interview" });
    //1:56:00
const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async({event}) => {
       try {
         await connectDB()
        const {id, email_addresses, first_name, last_name, image_url} = event.data
        const newUser = {
            clerkId: id,
            email:email_addresses[0]?.email_address,
            name:`${first_name || ""} ${last_name || ""}`,
            profileImage:image_url
        }
        await User.create(newUser)
       } catch (error) {
        console.error("Something went while creating the user!", error);
       }
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},

    async({event}) => {
       try {
         await connectDB()
        const {id} = event.data
        await User.deleteOne({clerkId: id});
       } catch (error) {
        console.error("Somegthing went wrong while deleting the user", error);
       }
    }
)

export const functions = [syncUser,deleteUserFromDB];