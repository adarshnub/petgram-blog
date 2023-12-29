import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

////////////////USER API
//create new user account
export async function createUserAccount(user: INewUser) {

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
        const newUser = await databases.createDocument(
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


//get logged-in user account
export async function getCurrentUser() {
    try {
        const currentAccount  = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId' , currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

//logout current user
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////POST API
//creating post
export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location? : string;
    tags? : string;
}

export async function UploadFile(file:File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file,
        )

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

//get file url for Preview
export function getFilePreview(fileId:string) {
    try {
        
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'top',
            100,
        )

        if(!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

//delete the file (inCase of error uploading)
export async function deleteFile(fileId:string) {
    try {
      await  storage.deleteFile(appwriteConfig.storageId,fileId)

      return {status : 'OK'};
    } catch (error) {
        console.log(error)
    }
}

//create post
export async function createPost (post :INewPost) {
    try {
        
        //upload file to appwrite
        const uploadedFile = await UploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        //file URL
        const fileUrl = getFilePreview(uploadedFile.$id);

        if(!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        //convert tags to array
        const tags = post.tags?.replace(/ /g,"").split(",") || [];

        //create post
        const newPost = await databases.createDocument(
            appwriteConfig.databseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption:post.caption,
                imageUrl:fileUrl,
                location:post.location,
                tags:tags,
                imageId: uploadedFile.$id,
            }
        )

        if(!newPost) {
           await deleteFile(uploadedFile.$id)
           throw Error;
        }
        return newPost;

    } catch (error) {
        console.log(error)
    }
}


// get recent post 

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc(`$createdAt`), Query.limit(20)]
    )
    if(!posts) throw Error;
    return posts; 
}

// get post by post_id
export async function getPostById(postId?:string) {
    if(!postId) throw Error;

    try {
        const post = await databases.getDocument(
            appwriteConfig.databseId,
            appwriteConfig.postCollectionId,
            postId,
        );
        if(!post) throw Error;

        return post;

    } catch (error) {
        console.log(error)
    }
}

export type IUpdatePost = {
    postId:string;
    caption:string;
    imageId:string;
    imageUrl:URL;
    file:File[];
    location:string;
    tags?:string;
}

//update post
export async function updatePost(post:IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
    try {

        let image = {
            imageUrl: post.imageUrl,
            imageId:post.imageId,
        }

        

    if(hasFileToUpdate) {
        //upload new file to appwrite
        const uploadedFile = await UploadFile(post.file[0]);
        if(!uploadedFile) throw Error;

        //get new image url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if(!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error;
        }
        
        image = { ...image,imageUrl:fileUrl, imageId:uploadedFile.$id}
    }    
        //tags to array
        const tags = post.tags?.replace(/ /g,"").split(",") || [];

        //update post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl:image.imageUrl,
                imageId:image.imageId,
                location:post.location,
                tags:tags,
            }
        );

        if(!updatedPost) {
            //if update fails ,delete that post
            if(hasFileToUpdate) {
                await deleteFile(image.imageId)
            }
            throw Error;
        }
        if(hasFileToUpdate) {
            await deleteFile(post.imageId)
        }
        return updatedPost;
    
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//like-unlike post
export async function likePost (postId:string,likesArray:string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes:likesArray,
            },
        )
        if(!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}