export interface SignupUserRequest {
  // name: string; //Optei por não solicitar, mas ao criar conta é comum cadastrar o nome do user
  email: string;
  password: string;
};
