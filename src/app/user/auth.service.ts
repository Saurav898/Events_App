import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { inspect } from "util";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  currentUser: IUser
  constructor(private http: HttpClient){}

  loginUser(userName: string, password: string) {

    const loginInfo = {userName: userName, password: password}
    const options = {headers: new HttpHeaders({'Content-Type': 'appliation/json'})}

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap( data => {
        this.currentUser = <IUser>data['user']
      }))
      .pipe(catchError(err => {
        return of(false)
      }))
  }
  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus(){
    this.http.get('/api/currentIdentity')
    .pipe(tap(data => {
      if(data instanceof Object){
        this.currentUser = <IUser>data
      }
    }))
    //.subscribe(data => {
    //  if(data instanceof Object){
    //    this.currentUser = <IUser>data;
    //  }
    //})
  }

  updateCurrentUser(firstName: string, lastName: string){
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName

    const options = {headers: new HttpHeaders({'Content-Type': 'appliation/json'})}

    return this.http.put(`/api/user/${this.currentUser.id}`, this.currentUser, options)
    }

    logOut(){
      this.currentUser = undefined;

      const options = {headers: new HttpHeaders({'Content-Type': 'appliation/json'})}
      return this.http.post('/api/logout', {}, options);
    }
  }
