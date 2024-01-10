import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/model.user';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    ;
  }

  async login() {
    const loading = await this.utilsService.loading();
    await loading.present();

    this.firebaseService.getLogin(this.form.value as User).then(res => {
      this.utilsService.openToast({
        message: `Bienvenido ${res.user.displayName}`,
        color: 'primary',
        duration: 1500,
        position: 'middle',
        icon: 'alert-circle-outline'
      })
      this.utilsService.routerLink('home');
    }).catch((e) => {
      this.utilsService.openToast({
        message: 'Correo o contraseña invalida, verifique las credenciales',
        color: 'danger',
        duration: 1500,
        position: 'middle',
        icon: 'alert-circle-outline'
      })
    }).finally(() => {
      loading.dismiss();
    });
  }

  routerLink() {
    this.utilsService.routerLink('sign-up');
  }

  sinUp() {
    console.log('registrar')
  }
}
