import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import {history} from '../../'
import {toast} from 'react-toastify'

axios.defaults.baseURL='http://localhost:5000/api/';
axios.interceptors.response.use(res=> res, 
    exception => { 
        if(exception.response && exception.response.status == 400)
         {
             history.push('/notfount')
         }

         if(exception.response && exception.response.status == 404){
            history.push('/notfound')
         }
         if(exception.response.status == 500)
         {
             toast.error('Server Error! for more info see console ')
         }
    })
const respondBody = (response: AxiosResponse) => response && response.data;

const sleep = (ms: number) => (response: AxiosResponse)=>  
    new Promise<AxiosResponse>(resolve=> setTimeout(()=>resolve(response), ms));

const requests = {
    get: (url:string) => axios.get<IActivity>(url).then(sleep(1000)).then(respondBody),
    post: (url: string, body: {}) => axios.post(url,body).then(sleep(1000)).then(respondBody),
    put: (url: string, body:{}) => axios.put(url, body).then(sleep(1000)).then(respondBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(respondBody)
}
    
const Activities = {
    getList: ():Promise<IActivity[]> =>requests.get('/activities'),
    getDetails: (id: string): Promise<IActivity> => requests.get(`/activities/${id}`),
    create: (activity: IActivity)=> requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`) 
}

export default Activities;