'use server'

import { console } from "inspector"
import { createAdminClient, createSessionClient } from "../appwrite"
import { Client, ID } from "node-appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
import { CountryCode, Products } from "plaid"
import { plaidCLient } from "../plaid"

export const Signin = async({ email, password}: signInProps) => {
    try {
        //Database//Mutation // Make Fetch
        const { account } = await createAdminClient();

        const respnse = await account.createEmailPasswordSession(email, password)

        return parseStringify(respnse);

    } catch (error) {
        console.error('Error',error)
    }

}

export const Signup = async(userData: SignUpParams) => {
   
   const {email, password, firstName, lastName} = userData;
   
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create
        (ID.unique(),
        userData.email, 
        userData.password,
        `${firstName} ${lastName}`
        );

        
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error',error)
    }

}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  
export const logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
}

export const createLinkToken = async (user: User)=> {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id
                
            },
            client_name: user.name,
            products: ['auth'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[],
        }

        const respnse = await plaidCLient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: respnse.data.link_token})
    } catch (error) {
        console.log(error);
    }
}