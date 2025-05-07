import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ClassColorPipe } from '../citronela-page/pipes/class-color.pipe';
import { DatePipe } from '@angular/common';
import { FactionColorPipe } from '../citronela-page/pipes/faction-color.pipe';
import { EnrichedCharacter } from '../citronela-page/interfaces/EnrichedCharacter.interface';
import { WowService } from '../citronela-page/services/wow.service';
import { Character, GuildMember } from '../citronela-page/interfaces/guild-member.interface';
import {
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  throwError,
  Observable
} from 'rxjs';

@Component({
  selector: 'app-lost-vikings-page',
  standalone: true,
  imports: [ClassColorPipe, DatePipe, FactionColorPipe],
  templateUrl: './lost-vikings-page.component.html'
})
export class LostVikingsPageComponent implements OnInit {

  private wowService = inject(WowService);

  currentPage = signal(1);
  itemsPerPage = 10;

  _searchTerm = signal('');

  searchTerm = {
    get: () => this._searchTerm(),
    set: (value: string) => {
      if (this._searchTerm() !== value) {
        this._searchTerm.set(value);
        this.currentPage.set(1); // Reset pagination
      }
    }
  };
  loading = signal(true);

  allGuildMembers = signal<GuildMember[]>([]);
  loadedCharacters = signal<Map<string, EnrichedCharacter>>(new Map());

  // New computed: filtered members based on search
  filteredMembers = computed(() => {
    const term = this.searchTerm.get().toLowerCase();
    return this.allGuildMembers().filter(member =>
      member.character.name.toLowerCase().includes(term)
    );
  });

  // Total pages based on filtered results
  totalPages = computed(() =>
    Math.ceil(this.filteredMembers().length / this.itemsPerPage)
  );

  // Paginated display of characters
  paginatedCharacters = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const pageMembers = this.filteredMembers().slice(start, start + this.itemsPerPage);
    return pageMembers
      .map(member => {
        const key = this.getCharacterKey(member.character);
        return this.loadedCharacters().get(key);
      })
      .filter((char): char is EnrichedCharacter => !!char);
  });

  ngOnInit() {
    this.wowService.getGuildInfo().subscribe(res => {
      this.allGuildMembers.set(res.members);
      this.loadAllCharacters(res.members);
    });

    // Reset to page 1 when search term changes (avoids infinite loop)
    let lastSearch = '';
    effect(() => {
      const currentSearch = this.searchTerm.get();
      if (currentSearch !== lastSearch) {
        this.currentPage.set(1);
        lastSearch = currentSearch;
      }
    });
  }

  private getCharacterKey(char: Character): string {
    return `${char.name.toLowerCase()}-${char.realm.slug.toLowerCase()}`;
  }

  private loadAllCharacters(members: GuildMember[]) {
    this.loading.set(true);

    const toLoad = members.filter(member => {
      const key = this.getCharacterKey(member.character);
      return !this.loadedCharacters().has(key);
    });

    if (toLoad.length === 0) {
      this.loading.set(false);
      return;
    }

    forkJoin(
      toLoad.map(member =>
        this.loadFullCharacterInfo(member.character).pipe(
          map(char => ({ key: this.getCharacterKey(member.character), char })),
          catchError(() => of(null)) // Skip failed loads
        )
      )
    ).subscribe(results => {
      const updated = new Map(this.loadedCharacters());
      for (const result of results) {
        if (result) {
          updated.set(result.key, result.char);
        }
      }
      this.loadedCharacters.set(updated);
      this.loading.set(false);
    });
  }

  sortCharacters(sortBy: string) {
    const members = [...this.allGuildMembers()];

    members.sort((a, b) => {
      const charA = this.loadedCharacters().get(this.getCharacterKey(a.character));
      const charB = this.loadedCharacters().get(this.getCharacterKey(b.character));

      if (!charA || !charB) return 0;

      switch (sortBy) {
        case "nombre":
          return charA.name.localeCompare(charB.name);
        case "nivel":
          return charB.level - charA.level;
        case "ilevel":
          return charB.iLevel - charA.iLevel;
        case "raza":
          return charA.race.localeCompare(charB.race);
        case "clase":
          return charA.class.localeCompare(charB.class);
        case "ultima":
          return charB.lastPlayed.getTime() - charA.lastPlayed.getTime();
        case "faccion":
          return charA.faction.localeCompare(charB.faction);
        default:
          return 0;
      }
    });

    this.allGuildMembers.set(members);
    this.currentPage.set(1);
  }

  loadFullCharacterInfo(champ: Character): Observable<EnrichedCharacter> {
    return this.wowService.getCharacterSummary(champ.realm.slug, champ.name).pipe(
      switchMap(summary =>
        forkJoin({
          race: this.wowService.getRace(summary.race.id).pipe(
            catchError(() => of({ name: 'Unknown Race' }))
          ),
          cls: this.wowService.getClass(summary.character_class.id).pipe(
            catchError(() => of({ name: 'Unknown Class' }))
          ),
          media: this.wowService.getCharacterMedia(champ.realm.slug, champ.name).pipe(
            catchError(() => of({ assets: [] }))
          )
        }).pipe(
          map(({ race, cls, media }) => ({
            name: champ.name,
            realm: champ.realm.slug!,
            level: champ.level,
            faction: summary.faction.type,
            iLevel: summary.equipped_item_level,
            race: race.name ?? 'Unknown Race',
            class: cls.name ?? 'Unknown Class',
            gender: summary.gender.type,
            mediaUrl: media.assets.find(a => a.key === 'avatar')?.value ?? '',
            lastPlayed: this.formatPlayTime(summary.last_login_timestamp)
          }))
        )
      ),
      catchError(err => {
        console.error('Error loading', champ.name, err);
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

  formatPlayTime(timestamp: number): Date {
    return new Date(timestamp);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
