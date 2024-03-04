import { h, Component, Prop, Host } from "@stencil/core";
import { IFieldItem, IRatingPosition, ITrainingPosition } from "./field.types";

// <hattrick-field [renderMode]="trainingPositions"></hattrick-field>
// var field = document.querySelector('hattrick-field');
// field.renderMode = 'trainingPositions';

// These are variables, but you can't change them without changing the background image!
const FieldWidth = 600;
const FieldHeight = 390;

@Component({
  tag: "hattrick-field",
  styleUrl: "field.css",
  shadow: true,
})
export class Field {
  // @Prop() renderMode: "trainingPositions" | undefined = undefined;

  @Prop() flipped: boolean = false;
  @Prop() size: number = 1;

  @Prop() trainingPositions?: { [positionId: number]: ITrainingPosition };
  @Prop() ratingPositions?: { [positionId: number]: IRatingPosition };

  @Prop() ratingNoStar: boolean = false;

  items: IFieldItem[] = defaultFieldItems;

  render() {
    return (
      <Host
        class={{ flipped: this.flipped }}
        style={{
          transform: `scale(${this.size})`,
          height: `${FieldHeight * this.size}px`,
          width: `${FieldWidth * this.size}px`,
        }}
      >
        <div
          class="field"
          style={{
            height: `${FieldHeight}px`,
            width: `${FieldWidth}px`,
          }}
        >
          <div class="positions">
            {this.items.map((positionItem) => (
              <div
                class={`position position-${positionItem.positionId}`}
                postition-id={positionItem.positionId}
              >
                {this.trainingPositions &&
                  this.renderTrainingPosition(positionItem.positionId)}
                {this.ratingPositions &&
                  this.renderRatingPosition(positionItem.positionId)}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }

  private renderTrainingPosition(positionId: number) {
    if (!this.trainingPositions[positionId]) return;

    const trainingPosition = this.trainingPositions[positionId];

    return (
      <div
        part="training-slot"
        class={{
          "training-slot": true,
          "training-slot-partial": trainingPosition.partial,
          "training-slot-bonus": trainingPosition.bonus,
        }}
      ></div>
    );
  }

  private renderRatingPosition(positionId: number) {
    const positionRating = this.ratingPositions[positionId];

    if (!positionRating) return;

    return (
      <hattrick-rating
        part="rating"
        rating={positionRating.stars}
        size={65}
        stamina={positionRating.stamina || 0}
        title={positionRating.label}
        noStar={this.ratingNoStar}
      ></hattrick-rating>
    );
  }
}

{
  /* 
    <div *ngFor="let positionItem of items"
          class="position position-{{ positionItem.positionId }}"
          [ngStyle]="getPositionStyles(positionItem.positionId, 0)">

      <ng-container *ngIf="positionTemplate">
        <ng-container *ngTemplateOutlet="positionTemplate; context: {$implicit: positionItem}"></ng-container>
      </ng-container>
    </div>
    </div>
    <div class="players" *ngIf="playerTemplate">
      <div *ngFor="let playerItem of items"
            class="player player-position-{{ playerItem.positionId }} player-behaviour-{{ playerItem.behaviour }}"
            [ngStyle]="playerPositions[playerItem.positionId]">
        
        <ng-container *ngTemplateOutlet="playerTemplate; context: {$implicit: playerItem}"></ng-container>
      </div>
    </div>
  </div> */
}

const defaultFieldItems: IFieldItem[] = [
  { positionId: 100, behaviour: 0 },
  { positionId: 101, behaviour: 0 },
  { positionId: 102, behaviour: 0 },
  { positionId: 103, behaviour: 0 },
  { positionId: 104, behaviour: 0 },
  { positionId: 105, behaviour: 0 },
  { positionId: 106, behaviour: 0 },
  { positionId: 107, behaviour: 0 },
  { positionId: 108, behaviour: 0 },
  { positionId: 109, behaviour: 0 },
  { positionId: 110, behaviour: 0 },
  { positionId: 111, behaviour: 0 },
  { positionId: 112, behaviour: 0 },
  { positionId: 113, behaviour: 0 },
];
