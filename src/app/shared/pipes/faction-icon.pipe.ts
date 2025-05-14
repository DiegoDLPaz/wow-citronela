import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'factionIcon'
})
export class FactionIconPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "ALLIANCE":
        return './assets/images/AllianceLogo.png'
      case "HORDE":
        return './assets/images/horde.png'
    }

    return "Pepe";
  }

}
