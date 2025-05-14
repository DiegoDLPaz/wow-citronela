import {Component, computed, effect, EffectRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WowService} from '../citronela-page/services/wow.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {TalentTreeComponent} from '../../../../shared/components/talent-tree/talent-tree.component';
import {NgIf} from '@angular/common';
import {TalentsService} from './services/talents.service';

@Component({
  selector: 'app-character-page',
  imports: [
    TalentTreeComponent,
    NgIf
  ],
  templateUrl: './character-page.component.html'
})
export class CharacterPageComponent{

  activatedRoute = inject(ActivatedRoute)
  wowService = inject(WowService)
  ts = inject(TalentsService);

  champName = this.activatedRoute.snapshot.paramMap.get("nombre")!

  champMediaResource = rxResource({
    loader: () => this.wowService.getCharacterMedia("golemagg",this.champName)
  })

  champSpecResource = rxResource({
    loader: () => this.wowService.getCharacterSpec(this.champName)
  })

  champResource = rxResource({
    loader: () => this.wowService.getCharacterSummary("golemagg",this.champName)
  })

  specGroup = computed(() => {
    return this.champSpecResource.value()?.specialization_groups!.find(group => group.is_active)!
  });

  loadTalentsEffect = effect(() => {
    const spec = this.champSpecResource.value();
    if (!spec) return;

    for (const specGroup of spec.specialization_groups || []) {
      if (!specGroup.is_active) continue;

      for (const specialization of specGroup.specializations || []) {
        const treeName = specialization.specialization_name;

        for (const talentEntry of specialization.talents || []) {
          const talentName = talentEntry.spell_tooltip.spell.name;
          const rank = talentEntry.talent_rank;

          console.log('Loading talents for:', treeName, talentName, rank);
          if (treeName && talentName && rank != null) {
            this.ts.setTalentRank(treeName, talentName, rank);
          }
        }
      }
    }

  });

  treeExists(className: string, treeName: string): boolean {
    const classData = this.ts['allData'][className];
    return classData && treeName in classData;
  }


}
