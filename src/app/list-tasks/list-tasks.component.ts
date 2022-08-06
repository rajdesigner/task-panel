/**
 * @author Rajmani Prasad
 * @email rprasad@okkular.io
 * @create date 2021-01-30 13:42:16
 * @modify date 2021-01-30 13:42:16
 * @desc [This component responsible for all CRUD operations of task panel]
 */
import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DevzaService } from '../commons/devza.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.sass'],
  providers: [DevzaService]
})
export class ListTasksComponent implements OnInit {
  tasks: any = [];
  users: any = [];
  normaltasks: any = [];
  mediumprioritytasks: any = [];
  lowtasks: any = [];
  public loading = false;
  dataSource = new MatTableDataSource();
  constructor(private taskServices: DevzaService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
   * @description
   */

  getAllUsers() {
    this.taskServices.getUsers().subscribe(data => {
      if (data) {
        this.users = data;

        this.getAllTasks();
      }
    },
      error => {
        this._snackBar.open(error['message'], 'Error', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    )
  }

  /**
   * 
   * @param priority 
   * @param post_type 
   * @param item 
   * @description this function 
   */
  openCreateTaskDialog(priority, post_type, item): void {
    const dialogRef = this.dialog.open(createTaskDialog, {
      width: '50vw',
      data: { 'users': this.users, 'priority': priority, 'clickeditem': item }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result !== undefined) {
        console.log('type of date Object', typeof result['due_date']);
        if (typeof result['due_date'] !== 'string') {
          let date = result['due_date'].getFullYear() + '-' + (result['due_date'].getMonth() + 1) + '-' + result['due_date'].getDate();
          let time = result['due_date'].getHours() + ":" + result['due_date'].getMinutes() + ":" + result['due_date'].getSeconds();
          result['due_date'] = date + ' ' + time;
        }

        this.taskServices.postTasks(result, post_type).subscribe(response => {
          this.loading = false;
          if (response) {
            if (post_type == 'create') {
              this._snackBar.open('New Task Created', 'Success', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });

              result['taskid'] = response['taskid'];
              this.tasks.push(result);
            }
            this.users.filter(user => { if (result['assigned_to'] == user.id) { result['assigned_name'] = user.name } })
            this.filterTasks(this.tasks);
          }
          else {
            this._snackBar.open(response['message'], 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        },
          (error => {
            this.loading = false;
            this._snackBar.open(error['message'], 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          })
        )
      }
      else {
        this.loading = false;
      }
    });
  }

  /**
   * 
   * @param event 
   */

  applyFilter(event) {
    if (undefined === event["currentTarget"].value || event["currentTarget"].value === '') this.filterTasks(this.tasks);
    let filteredtasks = this.tasks.filter(product => {
      let flag;
      for (let prop in product) {
        flag = false;
        flag = product[prop].toString().indexOf(event["currentTarget"].value) > -1;
        if (flag)
          break;
      }
      return flag;
    });
    this.filterTasks(filteredtasks);
  }

  /**
   * @description this function loads all tasks
   */
  getAllTasks() {
    this.taskServices.getTasks().subscribe(data => {
      this.tasks = data;
      this.dataSource = this.tasks;
      this.filterTasks(this.tasks);
      this.tasks.map(task => {
        this.users.filter(user => {
          if (user.id == task.assigned_to) {
            task['assigned_name'] = user.name
          }
        })
      });
      this.tasks.fil
    },
      error => {
        this._snackBar.open(error['message'], 'Error', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    )
  }


  /**
   * 
   * @param tasks
   * @description this function filters tasks based priority, 1: normal, 2: mid, 3: high
   */
  filterTasks(tasks) {
    this.normaltasks = tasks.filter(task => task['priority'] == 1);
    this.mediumprioritytasks = tasks.filter(task => task['priority'] == 2);
    this.lowtasks = tasks.filter(task => task['priority'] == 3);
  }

  /**
   * 
   * @param event 
   * @param priority
   * @description this function performs drag and drop functionality 
   */
  drop(event: CdkDragDrop<[]>, priority) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      event.item.data['priority'] = priority;
      this.taskServices.postTasks(event.item.data, 'update').subscribe(response => {
        if (response) {
          console.log('Item Updated');
          this._snackBar.open('View Updated', 'Success', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
        else {
          this._snackBar.open(response['message'], 'Error', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
        error => {
          this._snackBar.open(error['message'], 'Error', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      )
    }
  }

  /**
   * 
   * @param item 
   * @param post_type 
   * @param index 
   * @param task_type 
   */
  deleteTask(item, post_type, index, task_type) {
    this.loading = true;
    let confirmation = confirm("Are you sure to delete this task.");
    if (confirmation == true) {
      this.taskServices.postTasks(item, post_type).subscribe(response => {
        this.loading = false;
        if (response) {
          this._snackBar.open('Task id' + item.id + ' deleted', 'Success', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          if (task_type == 'normal') this.normaltasks.splice(index, 1)
          else if (task_type == 'medium') this.mediumprioritytasks.splice(index, 1)
          else this.lowtasks.splice(index, 1)
        }
        else {
          this.loading = false;
          this._snackBar.open('Something weent wrong', 'Error', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      })
    }
    else {
      this.loading = false;
      return false
    }
  }

}

/**
 * @description this component is for dialog for update and create tasks
 */

@Component({
  selector: 'create-task-dialog',
  templateUrl: 'create-task.html',
  styleUrls: ['./list-tasks.component.sass']
})
export class createTaskDialog {
  userlist: any = [];
  task: any = {}
  constructor(
    public dialogRef: MatDialogRef<createTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.userlist = data['users'];
    this.task['priority'] = data['priority'];
    if (data['clickeditem']) this.task = data['clickeditem']
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitTask() {
    this.dialogRef.close(this.task);
  }

}
