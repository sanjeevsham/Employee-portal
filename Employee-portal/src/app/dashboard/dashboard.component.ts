import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,NgForm } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  addform!:FormGroup;
  alluser!:any;
  exchange!:any;
  store:any=[];
  constructor(private formbuilder:FormBuilder,private api:EmployeeServiceService) { }

  ngOnInit(): void {
    this.addform=this.formbuilder.group({
      id:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      mobileno:['',Validators.required],
      bloodgroup:['',Validators.required],
      _id:[''],
      _rev:[''],
    })
  }


  
  addEmployee(formvalue:NgForm){
      console.log(formvalue);
      this.store.push(formvalue)
      this.api.addEmployee(formvalue).subscribe(res=>{
      console.log("hello"+res);
      console.log("Your data was posted successfully!");
      alert('your data is added successfully')
    },rej=>{
      console.log("opps! Can not post data"+rej);
    });
  }
  getuser(){
    this.api.getEmployee().subscribe(res=>{
      console.log(res);
      console.log("response is comming");
      this.alluser=res;
      this.alluser=this.alluser.data;
      this.alluser=this.alluser.rows;
      console.log(this.alluser);
      for (const key in this.alluser) {
            if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
              const element = this.alluser[key];
              console.log(element.id);
              this.api.getAllEmployee(element.id).subscribe(res=>{
                console.log(res);
                this.exchange=res;
                this.exchange=this.exchange.data;
                this.store.push(this.exchange);
                console.log("data is came");
              },rej=>{
                console.log("error"+rej);
              })
            
            }
          }
    },rej=>{
        console.log("opps! Somthing went wrong"+rej);
    })
  }
  
  delete(data:any,data1:any){
    this.api.deleteEmployee(data._id,data1._rev).subscribe(res=>{
      console.log("your data has deleted, please refresh the page");
    },rej=>{
      console.log("oops can not delete"+rej);
    })

  }
  
  onEdit(row:any){
    this.addform.controls['name'].setValue(row.name);
    this.addform.controls['username'].setValue(row.username);
    this.addform.controls['details'].setValue(row.details);
    // this.addform.controls['date'].setValue(row.date);
  //   this.addform.controls['_id'].setValue(row._id);
  //   this.addform.controls['_rev'].setValue(row._rev);
  }

  update(formvalue:NgForm){
    console.log(formvalue);
    this.api.updateEmployee(formvalue).subscribe(res=>{
      // console.log("update success");
      // console.log(res);
      console.log("Your data was updated successfully!");
    },rej=>{
      console.log("can not update....."+rej);
    })

  }
}