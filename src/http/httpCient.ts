import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";

class HttpClient{
    public api: AxiosInstance;
    constructor(axios:AxiosStatic, apiurl:string|undefined){
        const config: AxiosRequestConfig = {
            baseURL: apiurl,
            responseType: 'json',
            headers: {Accept: 'application/json'}
        }
        this.api = axios.create(config)
    }
    public get(url:string, config?:AxiosRequestConfig){
        return this.api.get(url, config)
    }
    public post(url: string, data: any, config?: AxiosRequestConfig) {
        return this.api.post(url, data, config);  
    }
}
export const http = new HttpClient(axios, 'http://localhost:8010')