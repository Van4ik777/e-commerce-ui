
import { http } from '@/http/httpCient';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class AuthService {
  public async login(userdata:{username:string, password: string}){
      const respons = await http.post('/user/register/', userdata); 
      return respons.data
  } 
  public async register(userdata:{email:string,username:string, password: string}){
      const csrfToken = cookies.get('csrftoken'); 
      if (!csrfToken) {
        throw new Error('CSRF token is missing');
    }
      const respons = await http.post('/user/register/',userdata,{
      headers:{
        'accept': 'application/json', 
        'Content-Type': 'application/json',
        'X-CSRFTOKEN':csrfToken
      }})
      console.log('Register response:', respons);
      return respons.data
  } 
  public async getToken( userdata: { username: string; password: string; }){
      const respons = await http.post('/user/getToken/',userdata)
      return respons.data
  } 
  public async checkEmail(userdata: { uuid: string; token: string; }) {
    const csrfToken = cookies.get('csrftoken'); 
    if (!csrfToken) {
      throw new Error('CSRF token is missing');
    }
    const response = await http.get(`/user/confirm-email/${userdata.uuid}/${userdata.token}`,{
      headers:{
        'accept': 'application/json', 
        'Content-Type': 'application/json',
        'X-CSRFTOKEN':csrfToken
      }})
    return response.data;
  }
}

export const authService = new AuthService();
