import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  notesObj : any = {id: '', content: ''};
  notesArr : any[] = [];
  newNote : {id: string, content: string} = {id:'', content: ''};
  tempArr:number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.notesObj = JSON.parse(JSON.stringify(localStorage));
    this.notesArr = Object.entries(this.notesObj);
  }

  addBtnClick(){
    if(Object.keys(this.notesObj).length === 0){
      this.newNote.id='0';
    }
    else{
      this.tempArr = Object.keys(this.notesObj).map(el=> parseInt(el));
      this.newNote.id = (Math.max(...this.tempArr)+1).toString();
    }
    this.notesObj[this.newNote.id as keyof typeof this.notesObj] = this.newNote.content;
    localStorage.setItem(this.newNote.id, this.newNote.content);
    this.newNote = {id: '', content: ''};
    this.notesArr= Object.entries(this.notesObj);
    // console.log(localStorage);
  }

  delBtnClick(myEl: any){
    delete this.notesObj[myEl.target.name];
    localStorage.removeItem(myEl.target.name);
    this.notesArr = Object.entries(this.notesObj);
  }

}
