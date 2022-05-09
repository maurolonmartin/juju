import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CharacterInfoComponent } from '@/character/character-info/character-info.component';
import { CharacterListComponent } from '@/character/character-list/character-list.component';


@NgModule({
  declarations: [
    CharacterInfoComponent,
    CharacterListComponent
  ],
  exports: [
    CharacterInfoComponent,
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CharactersModule { }
