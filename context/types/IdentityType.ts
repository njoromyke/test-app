export type ContextType = {
  theme: string;
  user: User;
  onThemeChange: () => void;
  logout: () => void;
};

export type User = {
  id: string;
  phoneNumber: string;
};
