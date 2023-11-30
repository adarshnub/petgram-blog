import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databses } from "./config";


//create new user account
export async function creeateUserAccount(user: INewUser) {

    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
            
        );
        // console.log(newAccount,"db-detils");
        
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDb({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//save user to db
export async function saveUserToDb(user : {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databses.createDocument(
            appwriteConfig.databseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

//sign-in to user account
export async function signInAccount(user: {email:string, password:string}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}