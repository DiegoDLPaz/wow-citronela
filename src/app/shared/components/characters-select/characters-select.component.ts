import {Component, input} from '@angular/core';
import {EnrichedCharacter} from '../../../pages/dashboard/pages/citronela-page/interfaces/EnrichedCharacter.interface';

@Component({
  selector: 'app-characters-select',
  imports: [],
  templateUrl: './characters-select.component.html'
})
export class CharactersSelectComponent {

  characters = input.required<EnrichedCharacter[]>()

  sortCharacters(sortBy: string){
    switch (sortBy) {
      case "nombre":
        this.characters().sort((a,b) => a.name.localeCompare(b.name))
        break;
      case "nivel":
        this.characters().sort((a,b) => b.level - a.level)
        break;
      case "ilevel":
        this.characters().sort((a,b) => b.iLevel - a.iLevel)
        break;
      case "raza":
        this.characters().sort((a,b) => a.race.localeCompare(b.race))
        break;
      case "clase":
        this.characters().sort((a,b) => a.class.localeCompare(b.class))
        break;
      case "ultima":
        this.characters().sort((a,b) => b.lastPlayed.getTime() - a.lastPlayed.getTime())
        break;
      case "faccion":
        this.characters().sort((a,b) => a.faction.localeCompare(b.faction))
        break;
    }
  }
}
