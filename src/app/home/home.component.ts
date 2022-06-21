import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { taskModel } from '../Models/taskModel';
import { userModel } from '../Models/userModel';
import { HomeService } from '../services/home.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasksList: taskModel[] = [];
  members: userModel[] = [];
  selectedCar!: number;
  myControl = new FormControl();
  creationDate = new FormControl();
  description = new FormControl();
  isDone = new FormControl();
  newTask = new taskModel();
  userType!:any;
  options: string[] = ['One', 'Two', 'Three', 'four', 'five', 'six'];
  filteredOptions!: Observable<string[]>;

  mems: any[] = [
    {
      id: 1,
      creationDate: '1/1/2022',
      description: 'description3',
      isDone: false,
      userId: '123554654',
    },
    {
      id: 2,
      creationDate: '1/1/2022',
      description: 'description3',
      isDone: true,
      userId: '123554654',
    },
    {
      id: 3,
      creationDate: '1/1/2022',
      description: 'description3',
      isDone: false,
      userId: '123554654',
    },
  ];

  constructor(private home: HomeService) {}
  ngOnInit(): void {
    this.userType =localStorage.getItem('userType');
    console.log(this.userType)
    this.getTasks();
    this.getMembers();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }
  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getTasks() {
    this.home.getTasksApi().subscribe((data: taskModel[]) => {
      console.table(data);
      data.forEach((task) => this.tasksList.push(task));
    });
    console.log(this.tasksList);
  }

  getMembers() {
    this.home.getMembersApi().subscribe((data: userModel[]) => {
      console.table(data);
      data.forEach((user) => this.members.push(user));
    });
    console.log(this.members);
  }

  clickSubmit() {
     
    if (this.myControl.value && this.description.value &&this.creationDate.value && this.description.value.length >= 10 && this.description.value.length < 100
    ) {
      
      this.newTask.userMail = this.myControl.value;
      this.newTask.description = this.description.value;
      this.newTask.creationDate = this.creationDate.value;

      this.home.CreateNewTask(this.newTask).subscribe((data: taskModel[]) => {
        this.tasksList.length = 0;
        data.forEach((task) => this.tasksList.push(task));
        this.myControl.setValue('');
        this.description.setValue('');
        this.creationDate.setValue('');
      });

    } else {
      alert('Complete data plz or check description length (10:100) characters');
    }
  }

  markTaskAsDone(id:any){
    console.log(id);
    this.home.MakeTaskDone(id).subscribe((data: taskModel[]) => {
      this.tasksList.length = 0;
      data.forEach((task) => this.tasksList.push(task));
      this.myControl.setValue('');
      this.description.setValue('');
      this.creationDate.setValue('');
    });
  }
}

 
