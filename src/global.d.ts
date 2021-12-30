declare namespace Pesca {
  interface LoginReturnDTO {
    access_token: string;
    refresh_token: string;
  }

  interface UserInformation {
    id: string;
    username: string;
    displayName: string;
  }

  interface UserProfileInformation extends UserInformation {
    email: string;
  }

  interface RefreshAccessTokenPayload {
    refresh_token: string;
  }

  interface RefreshAccessTokenDTO {
    access_token: string;
  }

  interface RegistrationPayload {
    username: string;
    password: string;
    displayName: string;
    email: string;
  }
}
