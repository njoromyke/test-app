export type ContextType = {
  theme: string;
  user: UserData | null;
  onThemeChange: () => void;
  logout: () => void;
  loading: boolean;
  tokenExpired: boolean;
};

type User = {
  phoneNumber: string;
  id: string;
};
export type UserData = {
  access_token: string;
  expiresIn: string;
  user: User;
};
