import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/model.user';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required]),
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

  async singUp() {
    const loading = await this.utilsService.loading('Creando Usuario');
    await loading.present();

    this.firebaseService.SingUp(this.form.value as User).then(async res => {

      await this.firebaseService.updateUser(this.form.value.name);

      this.form.controls.uid.setValue(res.user.uid)
      await this.createUser(this.form.value.uid);

    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      loading.dismiss();
    });
  }

  async createUser(uid: string) {
    const loading = await this.utilsService.loading('Registrando Usuario');
    await loading.present();

    delete this.form.value.password;

    let path = `users/${uid}`

    this.firebaseService.setDocument(path, this.form.value).then(res => {

      localStorage.setItem('user', JSON.stringify(this.form.value))
      this.utilsService.openToast({
        message: `Bienvenido ${this.form.value.name}`,
        color: 'primary',
        duration: 1500,
        position: 'middle',
        icon: 'alert-circle-outline'
      })
      this.utilsService.routerLink('login');
      this.form.reset();

    }).catch((e) => {
      console.log(e);
      loading.dismiss();
    }).finally(() => {
      loading.dismiss();
    });
  }


}
