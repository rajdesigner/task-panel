/**
 * @author Rajmani Prasad
 * @email rprasad@okkular.io
 * @create date 2021-01-29 18:44:16
 * @modify date 2021-01-29 19:57:36
 * @desc [description]
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevzaCommons } from '../commons/commons';
import { Constants } from '../commons/constants';
import * as uuid from 'uuid';
@Injectable()
export class DevzaService {
    options: any;
    constructor(
        private http: HttpClient
    ) { }
    
    /**
     * @description this api return list of users
     */

    getUsers() {
        return this.http.get(Constants.API_BASE + 'users');
    }

    /**
     * @description this function returns list of tasks
     */

    getTasks() {
        return this.http.get(Constants.API_BASE + 'tasks');
    }
    /**
     * @description this function is used to update tasks
     */

    postTasks(item, post_type){
        let formData: any = new FormData();
        if(item['taskid']) item.id = item['taskid'];
        if(post_type == 'create') item['id'] = uuid.v4();
        if(post_type == 'create' || post_type =='update'){
            
            // formData.append("message", item.message);
            // formData.append("due_date", item.due_date);
            // formData.append("priority", item.priority);
            // formData.append("assigned_to", item.assigned_to);

            // item['message'] = item.message;
            // item['due_date'] = item.due_date;
            // item['']
        }
        if(post_type == 'update')  return this.http.put(Constants.API_BASE + 'tasks/'+item.id, item);
        if(post_type == 'delete')  return this.http.delete(Constants.API_BASE + 'tasks/'+item.id);
        
        return this.http.post(Constants.API_BASE + 'tasks', item);
    }
}