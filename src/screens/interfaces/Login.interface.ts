export interface ILogin {
    email: string;
    password: string
}

export interface ILoginWithGoogle {
    email: string,
    firstName: string,
    lastName: string,
    photo: string,
    accessToken: string,
}