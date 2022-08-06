/*
 * Copyright (C) 2021 RajmaniforDevza
 *
 * Unauthorized use or copying of this file, via any medium 
 * is strictly prohibited. Proprietary and confidential.
 *
 * Written by Rajmani Prasad
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Commons is an injectable service. It holds some common functions which can be injected and used in any component.
 */
@Injectable()
export class DevzaCommons {
   constructor() {
      // write some initialization task here.
   }
   /**
    * This is a common function for all api calls which creates a 
    * http header and option and set authorization to header and 
    * returns RequestOptions
    */
   public static getHeaderOptions(): HttpHeaders {
      // creating http header object.
        let options = new HttpHeaders({
         'AuthToken': ''
       });
      return options;
   }
}
