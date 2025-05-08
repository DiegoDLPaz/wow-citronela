import {Component, inject, signal} from '@angular/core';
import {WowService} from '../citronela-page/services/wow.service';
import {WowCharacter, WowUserProfile} from '../citronela-page/interfaces/profile.interface';
import {EnrichedCharacter} from '../citronela-page/interfaces/EnrichedCharacter.interface';
import {catchError, forkJoin, map, Observable, of, switchMap, throwError} from 'rxjs';
import {FactionColorPipe} from '../citronela-page/pipes/faction-color.pipe';
import {DatePipe} from '@angular/common';
import {ClassColorPipe} from '../citronela-page/pipes/class-color.pipe';

@Component({
  selector: 'app-mis-personajes-page',
  imports: [
    FactionColorPipe,
    DatePipe,
    ClassColorPipe
  ],
  templateUrl: './mis-personajes-page.component.html'
})
export class MisPersonajesPageComponent {
  wowService = inject(WowService)

  token = signal<string>("")
  userProfile = signal<WowUserProfile | null>(null)
  enrichedCharacters = signal<EnrichedCharacter[]>([])

  ngOnInit(){
    if(localStorage.getItem("access_token")){
      this.token.set(localStorage.getItem("access_token")!)

      this.wowService.getProfile().subscribe(resp => {
        this.userProfile.set(resp)

        this.loadAllCharacters(resp.wow_accounts[0].characters)
      })
    }
  }

  obtenerPerfil(){
    const clientId = '6ce61a35c09d4d2892a6f7df4e75a04b'; // From Blizzard Developer Portal
    const redirectUri = 'https://wow-citronela.netlify.app/callback'; // The URI you set earlier
    const scope = 'wow.profile'; // The scope for WoW profile data
    const state = this.generateState()

    window.location.href = `https://oauth.battle.net/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state}`;
  }

  generateState() {
    return Math.random().toString(36).substring(2);
  }


  formatPlayTime(timestamp: number): Date{
    return new Date(timestamp);
  }

  loadFullCharacterInfo(champ: WowCharacter): Observable<EnrichedCharacter> {
    return this.wowService.getCharacterSummary(champ.realm.slug, champ.name).pipe(
      switchMap(summary =>
        forkJoin({
          race: this.wowService.getRace(summary.race.id).pipe(
            catchError(err => {
              console.error('Race error', err);
              return of({ name: 'Unknown Race' });
            })
          ),
          cls: this.wowService.getClass(summary.character_class.id).pipe(
            catchError(err => {
              console.error('Class error', err);
              return of({ name: 'Unknown Class' });
            })
          ),
          media: this.wowService.getCharacterMedia(champ.realm.slug, champ.name).pipe(
            catchError(err => {
              console.error('Media error', err);
              return of({ assets: [] });
            })
          )
        }).pipe(
          map(({ race, cls, media }) => {
            return {
              name: champ.name,
              realm: champ.realm.slug!,
              level: champ.level,
              faction: summary.faction.type,
              iLevel: summary.equipped_item_level,
              race: race.name ?? 'Unknown Race',
              class: cls.name ?? 'Unknown Class',
              gender: summary.gender.type,
              mediaUrl: media.assets.find(a => a.key === 'avatar')?.value ?? '',
              lastPlayed: this.formatPlayTime(summary.last_login_timestamp)!
            };
          })
        )
      ),
      catchError(err => {
        console.error('Summary error for character', champ.name, err);
        if (err.status === 404) {
          return of({
            name: champ.name,
            realm: champ.realm.slug!,
            level: champ.level,
            faction: 'UNKNOWN',
            iLevel: 0,
            race: 'Unknown',
            class: 'Unknown',
            gender: 'UNKNOWN',
            mediaUrl: '',
            lastPlayed: new Date()
          });
        }
        return throwError(() => err);
      })
    );
  }

  sortCharacters(sortBy: string){
    switch (sortBy) {
      case "nombre":
        this.enrichedCharacters().sort((a,b) => a.name.localeCompare(b.name))
        break;
      case "nivel":
        this.enrichedCharacters().sort((a,b) => b.level - a.level)
        break;
      case "ilevel":
        this.enrichedCharacters().sort((a,b) => b.iLevel - a.iLevel)
        break;
      case "raza":
        this.enrichedCharacters().sort((a,b) => a.race.localeCompare(b.race))
        break;
      case "clase":
        this.enrichedCharacters().sort((a,b) => a.class.localeCompare(b.class))
        break;
      case "ultima":
        this.enrichedCharacters().sort((a,b) => b.lastPlayed.getTime() - a.lastPlayed.getTime())
        break;
      case "faccion":
        this.enrichedCharacters().sort((a,b) => a.faction.localeCompare(b.faction))
        break;
    }
  }


  loadAllCharacters(characters: WowCharacter[]): void {
    forkJoin(
      characters.map(champ => this.loadFullCharacterInfo(champ))
    ).subscribe(fullList => {
      this.enrichedCharacters.set(fullList);
    });
  }

  protected readonly localStorage = localStorage;
}
