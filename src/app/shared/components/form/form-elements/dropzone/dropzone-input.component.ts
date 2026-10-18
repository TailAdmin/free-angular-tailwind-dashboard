import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';

export interface FileWithPreview {
  file: File;
  name: string;
  size: number;
  lastModified: number;
  preview?: string;
}

@Component({
  selector: 'app-dropzone-input',
  imports: [ButtonComponent, CommonModule],
  host: {
    class: 'block',
  },
  templateUrl: './dropzone-input.component.html',
})
export class DropzoneInputComponent implements OnDestroy {
  files: FileWithPreview[] = [];
  previewImage: FileWithPreview | null = null;
  isModalOpen = false;

  isDragActive = false;
  isDragAccept = false;
  isDragReject = false;
  isFocused = false;

  private acceptedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
  ];
  private maxFileSize = 5 * 1024 * 1024; // 5MB

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = true;

    if (event.dataTransfer?.items) {
      const items = Array.from(event.dataTransfer.items);
      const allValid = items.every(
        (item) => item.kind === 'file' && this.acceptedMimeTypes.includes(item.type)
      );
      this.isDragAccept = allValid;
      this.isDragReject = !allValid;
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
    this.isDragAccept = false;
    this.isDragReject = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
    this.isDragAccept = false;
    this.isDragReject = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFiles(Array.from(input.files));
      input.value = '';
    }
  }

  private handleFiles(incomingFiles: File[]) {
    const newFiles: FileWithPreview[] = incomingFiles
      .filter((file) => this.acceptedMimeTypes.includes(file.type) && file.size <= this.maxFileSize)
      .map((file) => ({
        file,
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
      }));

    this.files = [...this.files, ...newFiles];
  }

  removeFile(fileName: string) {
    const target = this.files.find((f) => f.name === fileName);
    if (target?.preview) {
      URL.revokeObjectURL(target.preview);
    }
    this.files = this.files.filter((f) => f.name !== fileName);
  }

  clearAllFiles() {
    this.files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
    this.files = [];
  }

  handleOpenPreview(file: FileWithPreview) {
    this.previewImage = file;
    this.isModalOpen = true;
  }

  handleClosePreview() {
    this.isModalOpen = false;
    this.previewImage = null;
  }

  getBorderColor(): string {
    if (this.isDragReject) return 'border-error-500 bg-error-50/60 dark:bg-error-950/20';
    if (this.isDragAccept) return 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/20';
    if (this.isFocused) return 'border-brand-500 ring-2 ring-brand-500/20 bg-gray-50 dark:bg-gray-900';
    return 'border-gray-300 bg-gray-50 hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500';
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  ngOnDestroy() {
    this.files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
  }
}
