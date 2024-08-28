import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.scss',
})
export class UserInfoPageComponent implements OnInit{

  private userService = inject(UserService);
  public userId = signal(1);

  public currentUser = signal<User|undefined>(undefined);
  public userMasFound= signal(true);
  public fullName = computed<string>( ()=>{
if(!this.currentUser()) return 'Usuario no encontrado';
return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

loadUser(id:  number){
  if (id <= 0) return;

  this.userId.set(id);
  this.currentUser.set(undefined);
  this.userService.getUserById(id)

  .subscribe({next:(user) =>{
 this.currentUser.set(user);
 this.userMasFound.set(true);
  },
  error:()=>{this.userMasFound.set(false);
  this.currentUser.set(undefined)
  }
});

}}
