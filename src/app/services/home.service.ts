import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { taskModel } from '../Models/taskModel';
import { userModel } from '../Models/userModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  tasks = [];
  members!:userModel[];
  //_________________________
  

  //#region  Constructor
  constructor(private http:HttpClient) { }
  //#endregion
  //#region Lists
  getTasksApi():Observable<taskModel[]>{
    return this.http.get<taskModel[]>(environment.url+"Home/GetAllTasks");
  }
 
  getMembersApi():Observable<userModel[]>{
    return this.http.get<userModel[]>(environment.url + "Home/GetAllMembers");
  }
 


   //#endregion
  //#region  assignTask
  MakeTaskDone(taskId:any):Observable<taskModel[]>
  {
   return this.http.post<taskModel[]>(environment.url+ "Home/MakeItDone?taskId="+ taskId,null);
  }

  //#endregion


  //#region 
    CreateNewTask(task:taskModel):Observable<taskModel[]>{
      debugger;
    const formData = new FormData();
      formData.append('userMail',task.userMail);
      formData.append('description',task.description);
      formData.append('creationDate',task.creationDate);
      console.log(formData.get('creationDate'));
     return this.http.post<taskModel[]>(environment.url+"Home/AddTask",formData);
    }
  //#endregion
 



}
