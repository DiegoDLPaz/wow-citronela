import {Component, inject, OnInit, signal} from '@angular/core';
import {WowService} from './services/wow.service';
import {EnrichedCharacter} from './interfaces/EnrichedCharacter.interface';
import {catchError, forkJoin, map, of, switchMap, throwError} from 'rxjs';
import {CharactersTableComponent} from '../../../../shared/components/characters-table/characters-table.component';
import {CharactersSelectComponent} from '../../../../shared/components/characters-select/characters-select.component';

const citronelaChampsNames =
  ["BabyErnest", "AmandoRivas", "Robertico", "Dellazyr","Prospectode","Pablomötos","NayibSureño","NayibNorteño","Yayiersen","Penano"]

@Component({
  selector: 'app-citronela-page',
  imports: [
    CharactersTableComponent,
    CharactersSelectComponent
  ],
  templateUrl: './citronela-page.component.html'
})
export class CitronelaPageComponent implements OnInit {

  wowService = inject(WowService)
  citronelaChamps = signal<EnrichedCharacter[]>([])

  ngOnInit() {
    this.loadCitronelaToletes()
  }

  loadCitronelaToletes() {
    citronelaChampsNames.forEach(name => {
      this.wowService.getCharacterSummary("golemagg", name).pipe(
        switchMap(summary =>
          forkJoin({
            race: this.wowService.getRace(summary.race.id).pipe(
              catchError(err => {
                console.error('Race error', err);
                return of({name: 'Unknown Race'});
              })
            ),
            cls: this.wowService.getClass(summary.character_class.id).pipe(
              catchError(err => {
                console.error('Class error', err);
                return of({name: 'Unknown Class'});
              })
            ),
            media: this.wowService.getCharacterMedia(summary.realm.slug, name).pipe(
              catchError(err => {
                console.error('Media error', err);
                return of({assets: []});
              })
            )
          }).pipe(
            map(({race, cls, media}) => {
              this.citronelaChamps.set([...this.citronelaChamps(), {
                name: summary.name,
                realm: summary.realm.slug!,
                level: summary.level,
                faction: summary.faction.type,
                iLevel: summary.equipped_item_level,
                race: race.name ?? 'Unknown Race',
                class: cls.name ?? 'Unknown Class',
                gender: summary.gender.type,
                mediaUrl: media.assets.find(a => a.key === 'avatar')?.value ?? '',
                lastPlayed: this.formatPlayTime(summary.last_login_timestamp)!
              }]);
            })
          )
        ),
        catchError(err => {
          console.error('Summary error for character', name, err);
          if (err.status === 404) {
            return of({
              name: name,
              realm: "Golemagg",
              level: 0,
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
      ).subscribe();
    })
  }

  sortCharacters(sortBy: string){
   switch (sortBy) {
     case "nombre":
       this.citronelaChamps().sort((a,b) => a.name.localeCompare(b.name))
       break;
     case "nivel":
       this.citronelaChamps().sort((a,b) => b.level - a.level)
       break;
     case "ilevel":
       this.citronelaChamps().sort((a,b) => b.iLevel - a.iLevel)
       break;
     case "raza":
       this.citronelaChamps().sort((a,b) => a.race.localeCompare(b.race))
       break;
     case "clase":
       this.citronelaChamps().sort((a,b) => a.class.localeCompare(b.class))
       break;
     case "ultima":
       this.citronelaChamps().sort((a,b) => b.lastPlayed.getTime() - a.lastPlayed.getTime())
       break;
     case "faccion":
       this.citronelaChamps().sort((a,b) => a.faction.localeCompare(b.faction))
       break;
   }
  }

  formatPlayTime(timestamp: number): Date {
    return new Date(timestamp);
  }
}
