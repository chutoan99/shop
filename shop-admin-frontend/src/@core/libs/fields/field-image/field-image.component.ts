import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BaseService } from 'channn-lib'
import { PrimeImageComponent } from '../../../components/prime-image/prime-image.component'
import { InputBase } from '../../models/InputBase'

@Component({
	selector: 'app-field-image',
	standalone: true,
	templateUrl: './field-image.component.html',
	styleUrl: './field-image.component.scss',
	imports: [ReactiveFormsModule, FormsModule, NgClass, NgIf, PrimeImageComponent]
})
export class FiledImageComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	imageUrl: string = ''
	constructor(private _baseService: BaseService) {}
	onFileSelected(event) {
		const file: File = event.target.files[0]

		if (file) {
			const formData = new FormData()
			formData.append(this.field.Name, file)
			formData.append('tbname', this.field.tbname)
			// formData.append("Resize_Width", "120");
			// formData.append("Resize_Height", "120");
			this._baseService.getFormAPIDefault('/api/data/uploadfiles', formData).subscribe((resp) => {
				if (resp.data.length > 0) {
					this.imageUrl = resp.data[0][this.field.Name]
					this.form.controls[this.field.Name].setValue(resp.data[0][this.field.Name])
				}
			})
		}
	}
	removeImage(event) {
		this.imageUrl = ''
		this.form.controls[this.field.Name].setValue('')
	}
	ngOnInit(): void {
		if (this.field.Value.hasOwnProperty('v')) {
			this.imageUrl = this.field.Value.v
		} else {
			this.imageUrl = this.field.Value
		}
		// if (this.field.Value != "") {
		//     if (this.field.Value.v) {
		//         this.imageUrl = this.field.Value.v;
		//     } else {
		//         this.imageUrl = this.field.Value
		//     }
		// } else {
		//     this.imageUrl = "";
		// }
	}
}
