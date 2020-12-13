import Axios, { AxiosResponse } from 'axios';
import axios from 'axios'
import { StrictGridColumnProps } from 'semantic-ui-react';
import { IActivity } from '../models/activity';

axios.defaults.baseURL='http://localhost:5000/api/';

const respondBody = (response: AxiosResponse) => response.data;

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