
// Different interfaces so we don't mix up data and cram everything into one and give optional fields

export interface User {
  id?: string;
  username: string;
  status?: string;
}

export interface AuthCredentials { // What login requires
  username: string;
  password: string; 
}

export interface AuthToken { // What login returns
  token: string;
  id: string;
}