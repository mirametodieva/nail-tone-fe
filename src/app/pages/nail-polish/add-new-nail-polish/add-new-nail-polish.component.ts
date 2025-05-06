import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NailPolishService} from "../../../services/nail-polish.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslocoService} from "@ngneat/transloco";

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
    colorCode: this.fb.control<string | null>('#FF0000', Validators.required)
  });

  constructor(private readonly fb: FormBuilder,
              private readonly nailPolishService: NailPolishService,
              private readonly router: Router,
              private readonly transloco: TranslocoService,
              private readonly snackbar: MatSnackBar) {
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
