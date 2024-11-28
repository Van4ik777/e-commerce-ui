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
    public getOneWithDetails(url: string, productId: number, config?: AxiosRequestConfig) {
        return this.api.get(url, config)
    }
    public getNoDetails(url:string, config?:AxiosRequestConfig){
        return this.api.get(url, config)
    }
}
export const http = new HttpClient(axios, '/src/data')