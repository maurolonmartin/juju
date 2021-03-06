import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Character } from '@/shared/interfaces/character.interface';
import { environment } from '@/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {



  constructor(private httpClient: HttpClient) { }

  searchCharacters(query='', page=1) {
    return this.httpClient.get<Character[]>(`${environment.apiURL}character/?name=${query}&page=${page}`);
  }

  getCharacterInfo(id: number) {
    return this.httpClient.get<Character>(`${environment.apiURL}character/${id}`);
  }

  getEpisodeName(url: string) {
    return this.httpClient.get<any>(url)
  }
}
