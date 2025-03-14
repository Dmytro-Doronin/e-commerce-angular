export interface loginInputData {
  email: string
  password: string
}

export interface loginResponseData {
  access_token: string
  refresh_token: string
}

export interface profileResponseData {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
