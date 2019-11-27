import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount:any = "";
  // productCount:any = "";
  employeeCount:any = "";
  // transactionCount:any = "";

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfEmployees();
    // this.numberOfProducts();
    // this.numberOfTransactions();
  }

  numberOfUsers(){
    this.adminService.numberOfUsers().subscribe(data => {
      //console.log("user count", data.response);
      this.userCount = data.response;
    });
  }

  // numberOfProducts(){
  //   this.adminService.numberOfProducts().subscribe(data => {
  //     this.productCount = data.response;
  //   });
  // }

  numberOfEmployees(){
    this.adminService.numberOfEmployees().subscribe(data => {
      //console.log("employee count", data.response);
      this.employeeCount = data.response;
    });
  }

  // numberOfTransactions(){
  //   this.adminService.numberOfTransactions().subscribe(data => {
  //     this.transactionCount = data.response;
  //   })
  // }

}
