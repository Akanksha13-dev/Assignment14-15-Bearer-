import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  credentials = {
    email:"",
    password:""
  }
  constructor(private cookieService:CookieService,private usersService: UsersService,private route: Router) { }

  ngOnInit(): void {
    //this.retrieveUsers();
  }

  onSubmit(){
    this.usersService.login(this.credentials).subscribe((response:any)=>{
      
    
      this.cookieService.put("id",response.token)
      this.route.navigateByUrl('/logged/users')
     
    }, err=>{
      alert(`Invalid Credentials`)
      console.log(err)
    })
  }

  // retrieveUsers(): void {
  //   //element.textContent='Refresh Data'
  
  //   this.usersService.getUsers()
  //     .subscribe(
  //       data => {
  //         for(let element of data){
           
  //         this.UsernameList.push(element.username) ;
  //         this.PasswordList.push(element.password);
  //         }
  //         //console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //     }

  //     login():void{
  //       let k=0;
        //console.log(this.UsernameList);
        //console.log(this.PasswordList);
        //console.log(this.user);
      //   for(let i=0;i<this.UsernameList.length;i++){
      //     if(this.UsernameList[i]==this.user.username && this.PasswordList[i]==this.user.password){
      //       k=1;
            
      //     }
      //   }
      //   if(k==1){this.route.navigate([`/logged`]);}
      //   else{
      //    this.message="Incorrect username or password"
      //     return;}
        
        
      // }
}
