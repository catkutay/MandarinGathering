import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

//Tab 2 to add new word to database
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  audio: any;

  audioFile: File;
  public createWordForm: FormGroup;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createWordForm = formBuilder.group({
      Mandarin: ['', Validators.required],
      Literal: ['', Validators.required],
      Translation: ['', Validators.required],
      example: ['', Validators.required],
      partOfSpeech: ['', Validators.required],
    });
  }
  async createWord() {
    const loading = await this.loadingCtrl.create();

    const Translation = this.createWordForm.value.Translation;
    const Literal = this.createWordForm.value.Literal;
    const Mandarin = this.createWordForm.value.Mandarin;
    const example = this.createWordForm.value.example;
    const partOfSpeech = this.createWordForm.value.partOfSpeech;
    const audio = null;
    this.firestoreService
      .createWord(Mandarin, Literal, Translation, example, partOfSpeech, audio)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        (error) => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

    return await loading.present();
  }

  ngOnInit() {}
}
