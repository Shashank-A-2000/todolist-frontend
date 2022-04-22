import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { ListService } from '../shared/list.service';
import { ITask } from '../shared/tasks';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute,private listService: ListService) { }

  id: number;
  name:string;
  sub!: Subscription;
  tasks : ITask[] = [];
  sid:number;
  userid : string;
  newTask : string;
  saveTask : ITask;
  showContent:boolean = false;

  public isCollapsed = true;
  ngOnInit() {
      this.id = Number(this.route.snapshot.paramMap.get('uid'));
      this.name = this.route.snapshot.paramMap.get('uname');
      this.userid = this.route.snapshot.paramMap.get('userid');
      this.sub = this.listService.getLists(this.id).subscribe({
        next: lists => {

          this.tasks = lists;
          console.log(this.tasks);
        },
        error:err => {console.log(err);}
      });

  }

  toggleButton(){
    this.showContent = !this.showContent;
  }

  addTask(task: any){
    this.listService.addTask(task).subscribe({
      next:data => {
        this.tasks.push(data);
      },
      error:err => {
        console.log(err);
        alert('Error in adding new task');
      },
    })
  }

  submitTask(login :NgForm){
    const tempTask = {
      task: this.newTask,
      status:false,
      uid:this.id,
      userid:this.userid
    };
    this.addTask(tempTask);
    login.reset();
  }



  updateTask(event){
    const statusTask = {
      "sid" : event.target.value
    }
    this.changeStatus(statusTask);
  }

  deleteTask(event){
    this.deleteTaskById(event.target.value);
  }

  deleteTaskById(deleteTaskId : number){

    this.listService.deleteTaskById(deleteTaskId).subscribe({
      next:data => {
        console.log(data);
        const index = this.tasks.findIndex(object => {return object.id == deleteTaskId});
        this.tasks.splice(index,1);
      },
      error:err => {
        console.log(err);
        alert('Error in deleting task status');
      },
    })
  }

  changeStatus(statusTask : any){

    this.listService.changeStatus(statusTask).subscribe({
      next:data => {
        const index = this.tasks.findIndex(object => {return object.id === data.id});
        this.tasks[index].status = true;
      },
      error:err => {
        console.log(err);
        alert('Error in Updating task status');
      },
    })
  }

  changeTask(taskId,taskValue){
    const tempTask = {
      task: taskValue,
      id:taskId
    };

    this.listService.changeTask(tempTask).subscribe({
      next:data =>{
        console.log("Successfully Updated Task");
        const index = this.tasks.findIndex(object => {return object.id === data.id});
        this.tasks[index].task = data.task;
        console.log(data);

      },
      error:err => {
        console.log(err);
        alert("Coudnt Update Task");
      },

    })
  }

  onNotify(values:any[]):void{
    const [id,value] = values;
    this.changeTask(id,value);
  }

}
