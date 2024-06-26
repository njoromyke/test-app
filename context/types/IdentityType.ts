export type ContextType = {
  theme: string;
  user: User;
  onThemeChange: () => void;
  login: (phoneNumber: string, password: string) => void;
  logout: () => void;
  register: (phoneNumber: string, password: string) => void;
};

export type User = {
  id: string;
  phoneNumber: string;
};
