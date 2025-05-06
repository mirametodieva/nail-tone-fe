import {Component, OnInit} from '@angular/core';
import {BeautySalonService} from "../../../services/beauty-salon.service";
import {filter, Observable, switchMap} from "rxjs";
import {BeautySalonDetails} from "../../../services/models/beauty-salon-details";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {NailPolishService} from "../../../services/nail-polish.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  details$?: Observable<BeautySalonDetails>;

  constructor(private readonly beautySalonService: BeautySalonService,
              private readonly nailPolishService: NailPolishService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.details$ = this.beautySalonService.getBeautySalonDetails();
  }

  onNailPolishDeletion(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirmation-dialog',
      autoFocus: false
    });

    dialogRef.afterClosed().pipe(
      filter(result => result),
      switchMap(() => this.nailPolishService.deleteNailPolish(id))
    ).subscribe(() => this.details$ = this.beautySalonService.getBeautySalonDetails());
  }
}
