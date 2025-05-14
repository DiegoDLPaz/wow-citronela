// src/app/components/talent-tree/talent-tree.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {State, Talent, TalentTree} from '../../../pages/dashboard/pages/character-page/interfaces/talent.interface';
import {TalentsService} from '../../../pages/dashboard/pages/character-page/services/talents.service';
import {KeyValue, KeyValuePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';


@Component({
  selector: 'app-talent-tree',
  templateUrl: './talent-tree.component.html',
  imports: [
    NgStyle,
    KeyValuePipe,
    NgForOf,
    NgIf,
    NgClass
  ]
})
export class TalentTreeComponent implements OnInit {
  @Input() treeName!: string;
  @Input() className!: string;
  treeData!: TalentTree;
  pointsSpent$!: Observable<State>;

  hoveredTalent: KeyValue<string, Talent> | null = null;
  tooltipX = 0;
  tooltipY = 0;


  onMouseMove(event: MouseEvent) {
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY;
  }

  readonly cellSize = 80;
  // size of your talent icon in px (w-12 h-12 → 3rem at 16px = 48px)
  readonly iconSize = 48;

  constructor(public ts: TalentsService) {}

  ngOnInit() {
    this.treeData   = this.ts.getTreeData(this.className,this.treeName);
    this.pointsSpent$ = this.ts.state.pipe(
      // map state → ts.getTreePointsSpent(this.treeName)
    );

    console.log(this.treeData)
  }

  getArrowStart(pos: string) {
    const { row, col } = this.toGrid(pos);
    const x = (col - 0.5) * this.cellSize;
    const y = (row - 0.5) * this.cellSize + this.iconSize / 2;
    return { x, y };
  }

  /** Returns {x,y} at the very top-center of the icon cell */
  getArrowEnd(pos: string) {
    const { row, col } = this.toGrid(pos);
    const x = (col - 0.5) * this.cellSize;
    const y = (row - 0.5) * this.cellSize - this.iconSize / 2;
    return { x, y };
  }

  toGrid(pos: string) {
    const row = pos.charCodeAt(0) - 96; // 'a' → 1
    const col = +pos[1];
    return { row, col };
  }

  clear() {
    this.ts.resetTree(this.treeName);
  }

  protected readonly Math = Math;
}
