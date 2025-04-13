export const setupAdminAccount = () => {
    const admin = {
      email: "admintest@gmail.com",
      password: "12341234",
      role: "admin",
    };
  
    if (!localStorage.getItem("adminAccount")) {
      localStorage.setItem("adminAccount", JSON.stringify(admin));
    }
  };
  