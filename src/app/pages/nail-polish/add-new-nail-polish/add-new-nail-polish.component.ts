import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NailPolishService} from "../../../services/nail-polish.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslocoService} from "@ngneat/transloco";
import {UploadImageComponent} from "../../../components/upload-image/upload-image.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-nail-polish',
  templateUrl: './add-new-nail-polish.component.html',
  styleUrls: ['./add-new-nail-polish.component.scss']
})
export class AddNewNailPolishComponent {
  form = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    serialNumber: this.fb.control<string | null>(null, Validators.required),
    catalogNumber: this.fb.control<number>(1, Validators.required),
    brand: this.fb.control<string | null>(null),
    colorCode: this.fb.control<string | null>('#FFF', Validators.required)
  });

  get colorCodeControl(): FormControl<string | null> {
    return this.form.get('colorCode') as FormControl<string | null>;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly nailPolishService: NailPolishService,
              private readonly router: Router,
              private readonly transloco: TranslocoService,
              private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar) {
  }

  onImageUpload() {
    const dialogRef = this.dialog.open(UploadImageComponent, {
      panelClass: 'upload-image-dialog',
      autoFocus: false,
      data: {
        mainStepsOnly: true
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => this.colorCodeControl.patchValue(result));
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.value;
      const model = {
        name: formValue.name ?? '',
        serialNumber: formValue.serialNumber ?? '',
        catalogNumber: formValue.catalogNumber ?? 0,
        brand: formValue.brand ?? undefined,
        colorCode: formValue.colorCode ?? ''
      }
      this.nailPolishService.addNewNailPolish(model)
        .subscribe(() => {
          this.snackbar.open(
            this.transloco.translate('nailPolish.successMessage'),
            '',
            {panelClass: 'success-mode', duration: 3000});

          this.router.navigateByUrl('/home');
        });
    }
  }
}
