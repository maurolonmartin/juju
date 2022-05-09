import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Character } from '@/app/shared/interfaces/character.interface';
import { CharacterServiceService } from '@/app/shared/services/character-service.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  info:any = {
    next: null,
  };
  showGoUpButton: boolean = false;
  private pageNumber: number = 1;
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(@Inject(DOCUMENT) private document: Document,
              private characterService: CharacterServiceService,
              private route: ActivatedRoute,
              private router: Router) {
                this.urlOnChanges();
               }

  ngOnInit(): void {
    this.getFilterCharacter();
  }

  onScrollUp(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
  onScrollDown(): void {
    if(this.info.next) {
      this.pageNumber++;
      this.getCharactersList();
    }
  }

  @HostListener('window: scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if(this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
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
        this.characters = [...this.characters, ...results];
        this.info = info;
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
