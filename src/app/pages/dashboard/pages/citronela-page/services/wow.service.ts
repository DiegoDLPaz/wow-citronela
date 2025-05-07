import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {WowUserProfile} from '../interfaces/profile.interface';
import {TokenResponse} from '../../../interfaces/TokenResponse.interface';
import {CharacterMedia} from '../interfaces/character.interface';
import {CharacterSummary} from '../interfaces/character-summary.interface';
import {PlayableRace} from '../interfaces/Race.interface';
import {PlayableClass} from '../interfaces/Class.interface';
import {GuildResponse} from '../interfaces/guild-response.interface';

const namespaceProfile = 'profile-classic-eu';
const namespaceStatic = 'static-classic-eu';

@Injectable({
  providedIn: 'root'
})
export class WowService {

  profileUrl = "https://eu.api.blizzard.com/profile/user/wow?namespace=profile-classic-eu&locale=es_GB";
  http = inject(HttpClient);

  profileCache = new Map<string,WowUserProfile>();
  guildCache = new Map<string, GuildResponse>();
  mediaCache = new Map<string, CharacterMedia>();
  summaryCache = new Map<string,CharacterSummary>
  raceCache = new Map<string,PlayableRace>
  classCache = new Map<string,PlayableClass>


  getProfile(): Observable<WowUserProfile> {
    const key = "pepe"

    if(this.profileCache.has(key)){
      return of(this.profileCache.get(key)!)
    }

    return this.http.get<WowUserProfile>(`${this.profileUrl}`)
      .pipe(
        tap(res => this.profileCache.set(key,res))
      );
  }

  getGuildInfo() :Observable<GuildResponse>{
    const key = "lost-vikings"

    if(this.guildCache.has(key)){
      return of(this.guildCache.get(key)!)
    }
    return this.http.get<GuildResponse>("https://eu.api.blizzard.com/data/wow/guild/golemagg/the-lost-vikings/roster?namespace=profile-classic-eu&locale=en_GB")
      .pipe(
        tap(res => this.guildCache.set(key,res))
      )
  }

  getCharacterMedia(realm: string, name: string): Observable<CharacterMedia> {
    const key = `${realm}-${name}`

    if(this.mediaCache.has(key)){
      return of(this.mediaCache.get(key)!)
    }

    const encodedRealm = encodeURIComponent(realm.toLowerCase());
    const encodedName = encodeURIComponent(name.toLowerCase());
    const url = `https://eu.api.blizzard.com/profile/wow/character/${encodedRealm}/${encodedName}/character-media?namespace=${namespaceProfile}&locale=en_GB`;

    return this.http.get<CharacterMedia>(url).pipe(
      tap(res => this.mediaCache.set(key,res))
    );
  }

  getCharacterSummary(realm: string, name: string): Observable<CharacterSummary> {
    const key = `${realm}-${name}`

    if(this.summaryCache.has(key)){
      return of(this.summaryCache.get(key)!)
    }

    const url = `https://eu.api.blizzard.com/profile/wow/character/${encodeURIComponent(realm.toLowerCase())}/${encodeURIComponent(name.toLowerCase())}?namespace=${namespaceProfile}&locale=en_GB`;

    return this.http.get<CharacterSummary>(url).pipe(
      tap(res => this.summaryCache.set(key,res))
    );
  }

  getRace(id: number): Observable<PlayableRace> {
    if(this.raceCache.has(id.toString())){
      return of(this.raceCache.get(id.toString())!)
    }

    const url = `https://eu.api.blizzard.com/data/wow/playable-race/${id}?namespace=${namespaceStatic}&locale=en_GB`;

    return this.http.get<PlayableRace>(url).pipe(
      tap(res => this.raceCache.set(id.toString(),res))
    );
  }

  getClass(id: number): Observable<PlayableClass> {
    if(this.classCache.has(id.toString())){
      return of(this.classCache.get(id.toString())!)
    }

    const url = `https://eu.api.blizzard.com/data/wow/playable-class/${id}?namespace=${namespaceStatic}&locale=en_GB`;

    return this.http.get<PlayableClass>(url).pipe(
      tap(res => this.classCache.set(id.toString(),res))
    );
  }

  exchangeCodeForToken(code: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('http://localhost:3000/api/token', {code});
  }

}
