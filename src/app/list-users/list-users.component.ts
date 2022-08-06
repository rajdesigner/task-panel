import { Component, OnInit } from '@angular/core';
import { DevzaService } from '../commons/devza.service'
@Component({
  selector: 'app-list-task',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-user.component.sass'],
  providers:[DevzaService]
})
export class ListUsersComponent implements OnInit {
  users:any = [];
  constructor(private taskServices: DevzaService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.taskServices.getUsers().subscribe(data=>{
      if(data){
        this.users = data['users'];
      }
    },
    error =>{
        console.log('Error from API', error);
    }
    )
  }

  getAllTasks(){
    this.taskServices.getTasks().subscribe(data=>{
      if(data){
        console.log('All Tasks', data)
      }
    },
    error =>{
        console.log('Error from API', error);
    }
    )
  }

}
