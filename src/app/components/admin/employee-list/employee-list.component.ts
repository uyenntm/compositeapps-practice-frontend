import { Component, OnInit,ViewChild } from '@angular/core';
import{ AdminService} from '../../../services/admin.service';
import {Employee} from '../../../model/employee';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Array<Employee>;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'phone','supervisor', 'action'];
  selectedEmployee: Employee = new Employee();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllEmployees();
  }

  applyFilter(filterValue: string) {
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllEmployees(){
    this.adminService.findAllEmployees().subscribe(data => {
      this.employeeList = data;
      this.dataSource.data = data;
    });
  }

  createNewEmployeeRequest(){
    this.selectedEmployee = new Employee();
    $('#employeeModal').modal('show');
  }

  editEmployeeRequest(employee: Employee){
    this.selectedEmployee = employee;
    $('#employeeModal').modal('show');
  }

  saveEmployee(){
    if(!this.selectedEmployee.id){
      this.createEmployee();
    }else{
      this.updateEmployee();
    }
  }

  createEmployee(){
    this.adminService.createEmployee(this.selectedEmployee).subscribe(data => {
      this.employeeList.push(data);
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.infoMessage = "Mission is completed";
      $('#employeeModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  updateEmployee(){
    this.adminService.updateEmployee(this.selectedEmployee).subscribe(data => {
      let itemIndex = this.employeeList.findIndex(item => item.id == this.selectedEmployee.id);
      this.employeeList[itemIndex] = this.selectedEmployee;
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.infoMessage = "Mission is completed";
      $('#employeeModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  deleteEmployeeRequest(employee: Employee){
    this.selectedEmployee = employee;
    $('#deleteModal').modal('show');
  }

  deleteEmployee(){
    this.adminService.deleteEmployee(this.selectedEmployee).subscribe(data => {
      let itemIndex = this.employeeList.findIndex(item => item.id == this.selectedEmployee.id);
      if(itemIndex !== -1){
        this.employeeList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.infoMessage = "Mission is completed";
      $('#deleteModal').modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

}
