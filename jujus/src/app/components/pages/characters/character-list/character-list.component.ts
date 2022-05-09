import { Character } from '@/app/shared/interfaces/character.interface';
import { CharacterServiceService } from '@/app/shared/services/character-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  private pageNumber: number = 1;
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(private characterService: CharacterServiceService,
              private route: ActivatedRoute,
              private router: Router) {
                this.urlOnChanges();
               }

  ngOnInit(): void {
    this.getFilterCharacter();
  }

  getFilterCharacter(): void {
    this.route.queryParams.subscribe( params => {
      this.query = params['q'];
      this.getCharactersList();
    });
  }

  getCharactersList():void {
    this.characterService.searchCharacter(this.query, this.pageNumber).
      pipe(take(1)).subscribe((response: any) => {
        const {info, results} = response;
        this.characters = [...this.characters, ...results]
      });
  }

  urlOnChanges(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.characters = [];
      this.pageNumber = 1;
      this.getFilterCharacter();
    });
  }

}
