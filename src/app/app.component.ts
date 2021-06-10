import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFile: File;
  productForm: FormGroup;
  imgFront;
  imgBack;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  private onUpload(imageFor) {
    const fd = new FormData();
    fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post('https://localhost:3443/products/upload', fd)
      .subscribe(res => imageFor === 'FRONT' ? this.imgFront = res : this.imgBack = res);
  }

  onFormSubmit() {
    const formData = {
      ...this.productForm.value,
      imgFront: this.imgFront,
      imgBack: this.imgBack
    };
    console.log('Form Data', formData);
  }

  onFileSelected(event, imageFor) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload(imageFor);
  }

}
