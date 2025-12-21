import { NgClass, NgIf, NgStyle } from '@angular/common'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BaseService, DataUtilsCore } from 'channn-lib'
import { NgxSpinnerService } from 'ngx-spinner'
import { MessageService } from 'primeng/api'
import { ButtonComponent } from '../../../components/button/button.component'
import { InputBase } from '../../models/InputBase'
import { FiledSelectOptionComponent } from '../field-select-option/field-select-option.component'
@Component({
	selector: 'app-field-upload-file',
	standalone: true,
	host: { class: 'field-upload-file' },
	templateUrl: './field-upload-file.component.html',
	styleUrl: './field-upload-file.component.scss',
	imports: [NgClass, NgIf, NgStyle, ReactiveFormsModule, FormsModule, ButtonComponent, FiledSelectOptionComponent]
})
export class FiledUploadFileComponent {
	@Input() public field: InputBase<any>
	@Input() public form!: FormGroup
	@Input() public submitted: boolean = false
	@Input() public isMultiRow: boolean = false
	lstDataFile: any = []
	@ViewChild('fileInput', { static: false }) fileInput!: ElementRef
	constructor(
		private _baseService: BaseService,
		private _spinner: NgxSpinnerService,
		private _messageService: MessageService
	) {}
	ngOnInit(): void {
		this.lstDataFile = this.getDataArrFile()
	}
	allowedFileTypes =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/vnd.ms-outlook, text/plain, text/html,htm html xhtml, application/pdf, image/*, video/mp4,video/x-m4v,video/*, .docx'

	isUploading = false
	fileUrl!: string | null
	uploadFile!: File | null

	async handleChange(event: any) {
		const files: File = event.target.files
		if (!files) {
			return
		}
		let size = Object.keys(files)
		if (size.length == 0) {
			return
		}
		this._spinner.show()
		let [errUpload, respUpload] = await this._baseService.Upload_Promise({
			tbname: this.field.tbname,
			colname: this.field.Name,
			files: files
		})
		this._spinner.hide()
		if (errUpload) {
			this._messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng kiểm tra dữ liệu' })
		}
		if (respUpload.data.length == 0) {
			return
		}
		this.setDataFile(respUpload.data[0][this.field.Name])
		this.lstDataFile = this.getDataArrFile()
	}
	getDataFile() {
		return this.form.value[this.field.Name]
	}
	setDataFile(dataUpdate) {
		let data = this.getDataFile()
		if (data) {
			data += ';' + dataUpdate
		} else {
			data += dataUpdate
		}
		this.form.controls[this.field.Name].setValue(data)
		return data
	}
	handleRemovesFile() {
		if (this.fileInput && this.fileInput.nativeElement) {
			this.fileInput.nativeElement.value = null
		}
		this.uploadFile = null
		this.fileUrl = null
	}
	handleUploadFile() {
		// logic to upload file
	}
	TestValue() {
		console.log(this.form.value[this.field.Name])
	}
	getDataArrFile() {
		let data = this.getDataFile()
		var dataSplit = []
		var valueFile = []
		if (data != '' && data != '-1' && data != null) {
			dataSplit = data.split(';')
			if (dataSplit.length > 0) {
				for (var i = 0; i < dataSplit.length; i++) {
					var obj = {}
					obj['filenameextension'] = DataUtilsCore.getFilenameAndExtension(dataSplit[i])[2]
					obj['ext'] = DataUtilsCore.getFilenameAndExtension(dataSplit[i])[1]
					obj['path'] = dataSplit[i]
					obj['icon'] = DataUtilsCore.getIconFileExtension(obj['ext'])
					valueFile.push(obj)
				}
			}
		}
		return valueFile
	}
	deleteItemFile(index) {
		this.lstDataFile.splice(index, 1)
		let data = this.lstDataFile.map((u) => u.path).join(';')
		this.form.controls[this.field.Name].setValue(data)
	}
}
