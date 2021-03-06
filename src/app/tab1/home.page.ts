import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { Word, Topic } from '../models/word.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public wordList: Observable<Word[]>;
  public topicList: Observable<Topic[]>;
  constructor(private firestoreService: FirestoreService) {}

  //Tab to view words in wordlist, links to Detail page to edit

  ngOnInit() {
    
    this.wordList = this.firestoreService.getWordList();
    this.topicList = this.firestoreService.getTopicList();
  }
}
