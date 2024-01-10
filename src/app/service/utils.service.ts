import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingController = inject(LoadingController);
  router = inject(Router);
  toastController = inject(ToastController)


  loading(message?: string){
    return this.loadingController.create({spinner : 'crescent', message: message});
  }

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  async openToast(opts?: ToastOptions){
    const toast = await this.toastController.create(opts);
    toast.present()
  }


}
