import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'factionColor'
})
export class FactionColorPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "HORDE":
        return "#FF0000";
      case "ALLIANCE":
        return "#0047AB";
    }

    return "#FFF";
  }

}
