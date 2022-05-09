import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersModule } from '@/character/characters.module';

import { HomeRoutingModule } from '@/home/home-routing.module';
import { HomeComponent } from '@/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CharactersModule
  ]
})
export class HomeModule { }
