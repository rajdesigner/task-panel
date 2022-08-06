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

@Injectable()
export class ListTasksService {
    options: any;
    constructor(
        private http: HttpClient
    ) { }
    

    getUsers() {
        return this.http.get(Constants.API_BASE + 'listUsers', { headers: DevzaCommons.getHeaderOptions() });
    }

    /**
     * @description this function returns list of tasks
     */
    getTasks() {
        return this.http.get(Constants.API_BASE + 'listUsers', { headers: DevzaCommons.getHeaderOptions() });
    }
}