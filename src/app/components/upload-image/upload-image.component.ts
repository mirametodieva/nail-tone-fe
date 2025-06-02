import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('canvas', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement>;

  displaySpinner = false;

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
  useOriginalImage: boolean = true;
  displaySegments = true;
  displaySegmentsCheckbox = true;
  disableColorPicking = true;

  pickedColor?: string;
  closestNailPolishes$?: Observable<NailPolish[]>;

  ngOnInit() {
    this.mainStepsOnly = this.data.mainStepsOnly;
  }

  onUpload(event: any) {
    this.uploadedFile = event?.files[0];
  }

  goToSecondStep() {
    this.displaySpinner = true;
    if (this.uploadedFile) {
      this.imageService.getImageWithEnhanceLight(this.uploadedFile)
        .subscribe(blob => {
          this.normalizedImage = blob;
          this.normalizedImageUrl = URL.createObjectURL(blob);
          this.originalImageUrl = URL.createObjectURL(this.uploadedFile!);
          this.goToNextStep();
          this.displaySpinner = false;
        });
    }
  }

  goToThirdStep() {
    const file = this.useOriginalImage ? this.uploadedFile : this.normalizedImage;
    if (this.mainStepsOnly) {
      this.goToNextStep();
      this.buildCanvasImage();
    } else {
      this.displaySpinner = true;
      this.imageService.getSegmentNails(file!)
        .subscribe({
          next: (blob) => {
            this.segmentedImageUrl = URL.createObjectURL(blob);
            this.goToNextStep();
            this.displaySpinner = false;
            this.buildCanvasImage();
          },
          error: (err) => {
            console.error('Error during nail segmentation:', err);
            this.displaySegmentsCheckbox = false;
            this.displaySpinner = false;
            this.goToNextStep();
            this.buildCanvasImage();
          }
        });
    }
  }

  toggleDisplaySegmentedNails() {
    this.displaySegments = !this.displaySegments;
    this.buildCanvasImage();
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
    if (('EyeDropper' in window)) {
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
    } else {
      console.error('EyeDropper API is not supported in this browser.');
      this.disableColorPicking = false;
    }
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.disableColorPicking) {
      this.getColorFromCanvas(event.clientX, event.clientY);
      if (this.mainStepsOnly) {
        this.dialogRef.close(this.pickedColor);
      } else {
        this.closestNailPolishes$ = this.nailPolishService.getClosestNailPolishes(this.pickedColor!)
          .pipe(tap(() => this.goToNextStep()));
      }
    }
  }

  onCanvasTouch(event: TouchEvent) {
    if (!this.disableColorPicking) {
      const touch = event.touches[0];
      this.getColorFromCanvas(touch.clientX, touch.clientY);
      if (this.mainStepsOnly) {
        this.dialogRef.close(this.pickedColor);
      } else {
        this.closestNailPolishes$ = this.nailPolishService.getClosestNailPolishes(this.pickedColor!)
          .pipe(tap(() => this.goToNextStep()));
      }
    }
  }

  private buildCanvasImage() {
    const file = this.useOriginalImage ? this.uploadedFile : this.normalizedImage;
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        const displaySegmentedNails = this.displaySegments && !this.mainStepsOnly && this.segmentedImageUrl;
        if (displaySegmentedNails) {
          ctx.filter = 'grayscale(100%)';
        }
        ctx.drawImage(img, 0, 0);
        ctx.filter = 'none';

        if (displaySegmentedNails) {
          const segmentImage = new Image();
          segmentImage.src = this.segmentedImageUrl!;
          segmentImage.onload = () => {
            ctx.drawImage(segmentImage, 0, 0); // Overlays segmented image
          };
        }
      };
    }
  }

  private getColorFromCanvas(clientX: number, clientY: number) {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${[...pixel].slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('')}`;
    this.pickedColor = hex;
  }

  private goToNextStep() {
    this.stepper.next();
  }

}
