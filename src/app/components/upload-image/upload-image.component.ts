import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FileUpload} from "primeng/fileupload";
import {MatStepper} from "@angular/material/stepper";
import {ImageService} from "../../services/image.service";
import {NailPolishService} from "../../services/nail-polish.service";
import {Observable, tap} from "rxjs";
import {NailPolish} from "../../services/models/nail-polish";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(FileUpload) fileUpload!: FileUpload;

  constructor(private readonly imageService: ImageService,
              private readonly nailPolishService: NailPolishService,
              private readonly dialogRef: MatDialogRef<UploadImageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  mainStepsOnly = true;
  uploadedFile?: File;
  normalizedImage?: File;
  normalizedImageUrl?: string;
  originalImageUrl?: string;
  segmentedImageUrl?: string;
  useOriginalImage = false;
  displaySegments = true;

  pickedColor?: string;
  closestNailPolishes$?: Observable<NailPolish[]>;

  ngOnInit() {
    this.mainStepsOnly = this.data.mainStepsOnly;
  }

  onUpload(event: any) {
    this.uploadedFile = event?.files[0];
  }

  goToSecondStep() {
    if (this.uploadedFile) {
      this.imageService.getImageWithEnhanceLight(this.uploadedFile)
        .subscribe(blob => {
          this.normalizedImage = blob;
          this.normalizedImageUrl = URL.createObjectURL(blob);
          this.originalImageUrl = URL.createObjectURL(this.uploadedFile!);
          this.goToNextStep();
        });
    }
  }

  goToThirdStep() {
    const file = this.useOriginalImage ? this.uploadedFile : this.normalizedImage;
    if (this.mainStepsOnly) {
      this.goToNextStep();
    } else {
      this.imageService.getSegmentNails(file!)
        .subscribe(blob => {
          this.segmentedImageUrl = URL.createObjectURL(blob);
          this.goToNextStep();
        });
    }
  }

  reset() {
    this.uploadedFile = undefined;
    this.normalizedImage = undefined;
    this.normalizedImageUrl = undefined;
    this.originalImageUrl = undefined;
    this.segmentedImageUrl = undefined;
    this.useOriginalImage = false;
    this.displaySegments = true;
    this.pickedColor = undefined;
    this.closestNailPolishes$ = undefined;

    this.fileUpload.clear();
    this.stepper.reset();
  }

  async openEyeDropper() {
    if ('EyeDropper' in window) {
      if (!('EyeDropper' in window)) {
        alert('EyeDropper API is not supported in this browser.');
        return;
      }
      const eyeDropper = new (window as any).EyeDropper();
      try {
        const result = await eyeDropper.open();
        this.pickedColor = result.sRGBHex;
        if (this.mainStepsOnly) {
          this.dialogRef.close(this.pickedColor);
        } else {
          this.closestNailPolishes$ = this.nailPolishService.getClosestNailPolishes(this.pickedColor!)
            .pipe(tap(() => this.goToNextStep()));
        }
      } catch (err) {
        console.error('EyeDropper canceled or failed:', err);
      }
    }
  }

  private goToNextStep() {
    this.stepper.next();
  }

}
