import {Component, input, output} from '@angular/core';
import {NailPolish} from "../../services/models/nail-polish";

@Component({
  selector: 'app-nail-polish-card',
  templateUrl: './nail-polish-card.component.html',
  styleUrls: ['./nail-polish-card.component.scss']
})
export class NailPolishCardComponent {
  nailPolish = input.required<NailPolish>();
  withAction = input<boolean>(false);

  onAction = output<void>();

  emitAction() {
    this.onAction.emit();
  }

}
