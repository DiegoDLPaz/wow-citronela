import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State, TalentData, TalentTree } from '../interfaces/talent.interface';

import { data as druidData }  from '../../../../../trees/Druid/data';
import { data as hunterData } from '../../../../../trees/Hunter/data';
import { data as mageData }   from '../../../../../trees/Mage/data';
import { data as paladinData }   from '../../../../../trees/Paladin/data';
import { data as priestData }   from '../../../../../trees/Priest/data';
import { data as rogueData }   from '../../../../../trees/Rogue/data';
import { data as shamanData }   from '../../../../../trees/Shaman/data';
import { data as warlockData }   from '../../../../../trees/Warlock/data';
import { data as warriorData }   from '../../../../../trees/Warrior/data';

@Injectable({ providedIn: 'root' })
export class TalentsService {
  private allData: Record<string, TalentData> = {
    Druid:  druidData,
    Hunter: hunterData,
    Mage:   mageData,
    Paladin: paladinData,
    Priest: priestData,
    Rogue: rogueData,
    Shaman: shamanData,
    Warlock: warlockData,
    Warrior: warriorData
  };

  private readonly MAX_TREE_POINTS = 31;

  private initialState: State = this.createInitialState(this.allData);

  private state$: BehaviorSubject<State> = new BehaviorSubject(this.initialState);
  public state = this.state$.asObservable();

  private createInitialState(all: Record<string, TalentData>): State {
    const s: State = {};
    for (const [className, data] of Object.entries(all)) {
      for (const [treeName, tree] of Object.entries(data)) {
        s[treeName] = {};
        for (const talentName of Object.keys(tree.talents)) {
          s[treeName][talentName] = 0;
        }
      }
    }
    return s;
  }

  getTreeData(className: string, treeName: string): TalentTree {
    const classData = this.allData[className];
    if (!classData) throw new Error(`Unknown class: ${className}`);
    const tree = classData[treeName];
    if (!tree) throw new Error(`Unknown tree: ${treeName}`);
    return tree;
  }

  getTreePointsSpent(tree: string): number {
    return Object.values(this.state$.value[tree] || {}).reduce((sum, v) => sum + v, 0);
  }

  setTalentRank(tree: string, rawTalentName: string, rank: number) {
    const normalizedName = this.normalizeTalentName(rawTalentName);

    const currentTree = this.state$.value[tree];
    if (!currentTree) return;

    const internalTalentName = Object.keys(currentTree).find(
      key => this.normalizeTalentName(key) === normalizedName
    );

    if (internalTalentName) {
      const newState = { ...this.state$.value };
      newState[tree] = {
        ...newState[tree],
        [internalTalentName]: rank
      };
      this.state$.next(newState);
    } else {
      console.warn(`Talent "${rawTalentName}" not found in tree "${tree}"`);
    }
  }

  normalizeTalentName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  getTalentRank(tree: string, talent: string): number {
    return this.state$.value[tree]?.[talent] ?? 0;
  }

  spendPoint(tree: string, talent: string) {
    const currentRank = this.state$.value[tree]?.[talent] ?? 0;
    const maxRank = this.getTreeDataForTalent(tree, talent)?.maxRank ?? 0;
    const pointsSpent = this.getTreePointsSpent(tree);

    if (currentRank < maxRank && pointsSpent < this.MAX_TREE_POINTS) {
      const newState = { ...this.state$.value };
      newState[tree] = { ...newState[tree], [talent]: currentRank + 1 };
      this.state$.next(newState);
    }
  }

  isRankComplete(tree:string, talent:string){
    const currentRank = this.state$.value[tree]?.[talent] ?? 0;
    const maxRank = this.getTreeDataForTalent(tree, talent)?.maxRank ?? 0;
    return currentRank === maxRank;
  }

  unspendPoint(tree: string, talent: string) {
    const currentRank = this.state$.value[tree]?.[talent] ?? 0;

    if (currentRank > 0) {
      const newState = { ...this.state$.value };
      newState[tree] = { ...newState[tree], [talent]: currentRank - 1 };
      this.state$.next(newState);
    }
  }

  resetTree(tree: string) {
    const freshTree = this.createInitialState({ [tree]: { [tree]: this.getTreeData(tree, tree) } })[tree];
    this.state$.next({ ...this.state$.value, [tree]: freshTree });
  }

  private getTreeDataForTalent(tree: string, talent: string) {
    for (const classData of Object.values(this.allData)) {
      if (tree in classData) {
        return classData[tree].talents[talent];
      }
    }
    return null;
  }
}
