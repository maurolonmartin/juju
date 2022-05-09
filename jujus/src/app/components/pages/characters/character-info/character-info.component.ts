import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Location } from '@angular/common';

import { Character } from '@/app/shared/interfaces/character.interface';
import { CharacterServiceService } from '@/app/shared/services/character-service.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent implements OnInit {

  character$: Observable<Character>;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterServiceService,
              private location: Location ) { }

  ngOnInit(): void {
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterService.getCharacterInfo(id);
    });
  }

  goBack() {
    this.location.back();
  }

}
