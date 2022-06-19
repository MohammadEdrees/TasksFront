import { Component, OnInit } from '@angular/core';
import { taskModel } from '../Models/taskModel';
import { userModel } from '../Models/userModel';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasksList!: taskModel[];
  members !:userModel[];
  
  constructor(private home:HomeService) { }
  
  ngOnInit(): void {
    this.getTasks();
    this.getMembers();
  }
   
  getTasks()
  {
     this.home.getTasksApi().subscribe(data=>{
      console.warn(data);
     });
  }
   
  getMembers()
  {
   this.home.getMembersApi().subscribe((data:userModel[])=>{
    console.warn(data);
    data.forEach(user=>{

    })
  });
   console.log(this.members);
   }

}
