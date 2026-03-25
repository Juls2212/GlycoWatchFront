export const authService = {
  login: async (email: string, password: string) => {
    // mock temporal
    return {
      user: {
        id: "1",
        email,
        name: "Demo User",
      },
      token: "fake-jwt-token",
    };
  },

  logout: async () => {
    return true;
  },
   register: async (data: RegisterRequestDTO) => {
     // mock temporal
     return {
       user: {
         id: "1",
         email: data.email,
         name: data.name,
       },
       token: "fake-jwt-token",
     };
   },
  getMe: async () => {
    return {
      id: "1",
      email: "demo@glyco.com",
      name: "Demo User",
    };
  },
};