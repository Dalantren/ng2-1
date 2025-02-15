import { upload } from '@qgrid/core';
import { readFile } from './read';

export class ImportPlugin {
  constructor(model, element) {
    this.model = model;
    this.element = element;
  }

  upload() {
    upload(this.element);
  }

  load(e) {
    const { files } = e.target;
    for (const file of files) {
      const reader = new window.FileReader();
      reader.onload = e => readFile(e, file, this.model, this.options);
      reader.readAsBinaryString(file);
    }
  }
}
