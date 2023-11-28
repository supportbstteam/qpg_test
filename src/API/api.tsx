import axios from "axios";
import { Credential, UserData, changePassword } from './types'
const BASE_API_URL = 'https://bwptestpapers.com/api/';
export const Image_Base_Url = 'https://bwptestpapers.com/public'

const instance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})


const api = {

  register: (credentials: UserData) => instance.post('register', credentials),
  login: (Credential: Credential) => instance.post('login', Credential),
  get_user: (token: string, userId: number) => instance.get(`user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),
  user_update: (userId: number, token: string, updateprofile: FormData) => instance.post(`update/${userId}`, updateprofile, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Add this header
    }
  }),
  change_password: (token: string, Credential: changePassword) => instance.post(`profile/change-password`, Credential, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Add this header
    }
  }),
  logout: (token: string) => instance.get('/logout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  }),



  //   digital contant
  class: (token: string) => instance.get(`class`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),
  subject: (token: string, ClassID: number) => instance.get(`subject/${ClassID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),

  video: (token: string, ClassID: number, subjectID: number) => instance.get(`video/${ClassID}/${subjectID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),


  book: (token: string, ClassID: number, subjectID: number) => instance.get(`book/${ClassID}/${subjectID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),

  pdf: (token: string, ClassID: number, subjectID: number) => instance.get(`pdf/${ClassID}/${subjectID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }),

  // user_attendance:(token: string,userData:any) => instance.post(`user-attendance`,userData,{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   }
  // }),
  // user_map_pdate:(token: string,data:any) => instance.post(`user-map-update`,data,{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   }
  // }),
}




export default api