import {Component, input} from '@angular/core';
import {EnrichedCharacter} from '../../../pages/dashboard/pages/citronela-page/interfaces/EnrichedCharacter.interface';
import {ClassColorPipe} from '../../../pages/dashboard/pages/citronela-page/pipes/class-color.pipe';
import {DatePipe} from '@angular/common';
import {FactionColorPipe} from '../../../pages/dashboard/pages/citronela-page/pipes/faction-color.pipe';
import {FactionIconPipe} from '../../pipes/faction-icon.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-characters-table',
  imports: [
    ClassColorPipe,
    DatePipe,
    FactionColorPipe,
    FactionIconPipe,
    RouterLink
  ],
  templateUrl: './characters-table.component.html'
})
export class CharactersTableComponent {
  characters = input.required<EnrichedCharacter[]>()

  formatPlayTime(timestamp: number): Date{
    return new Date(timestamp);
  }
}
