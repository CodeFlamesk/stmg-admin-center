declare module '@clerk/clerk-sdk-node' {
    export interface User {
      id: string;
      emailAddresses: { emailAddress: string }[];
      username?: string;
      firstName?: string;
      lastName?: string;
      profileImageUrl?: string;
    }
  
    export const users: {
      getUserList(): Promise<User[]>;
    };
  }
  