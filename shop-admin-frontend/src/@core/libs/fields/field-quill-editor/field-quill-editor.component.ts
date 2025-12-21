import { NgClass, NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppConfig, BaseService, CryptoExtension } from 'channn-lib'
import { QuillModule } from 'ngx-quill'
import { NgxSpinnerService } from 'ngx-spinner'
import { MessageService } from 'primeng/api'
import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter'
import { htmlEditButton } from 'quill-html-edit-button'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import VideoResize from 'quill-video-resize-module'
import { InputBase } from '../../models/InputBase'
Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register({ 'modules/htmlEditButton': htmlEditButton })
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/VideoResize', VideoResize)
var Block = Quill.import('blots/block')
Block.tagName = 'DIV'
Quill.register(Block, true)
var BaseImageFormat = Quill.import('formats/image')
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style']

class ImageFormat extends BaseImageFormat {
	static formats(domNode) {
		return ImageFormatAttributesList.reduce(function (formats, attribute) {
			if (domNode.hasAttribute(attribute)) {
				formats[attribute] = domNode.getAttribute(attribute)
			}
			return formats
		}, {})
	}
	format(name, value) {
		if (ImageFormatAttributesList.indexOf(name) > -1) {
			if (value) {
				this['domNode'].setAttribute(name, value)
			} else {
				this['domNode'].removeAttribute(name)
			}
		} else {
			super.format(name, value)
		}
	}
}

Quill.register(ImageFormat, true)
const fontSizeArray = [
	'8px',
	'9px',
	'10px',
	'11px',
	'12px',
	'13px',
	'14px',
	'15px',
	'16px',
	'18px',
	'20px',
	'22px',
	'24px',
	'26px',
	'28px',
	'36px',
	'48px'
]
const fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = fontSizeArray
Quill.register(fontSizeStyle, true)
const AlignStyle = Quill.import('attributors/style/align')
const BackgroundStyle = Quill.import('attributors/style/background')
const ColorStyle = Quill.import('attributors/style/color')
const DirectionStyle = Quill.import('attributors/style/direction')
const FontStyle = Quill.import('attributors/style/font')
Quill.register(AlignStyle, true)
Quill.register(BackgroundStyle, true)
Quill.register(ColorStyle, true)
Quill.register(DirectionStyle, true)
Quill.register(FontStyle, true)
@Component({
	selector: 'app-field-quill-editor',
	standalone: true,
	imports: [NgClass, FormsModule, QuillModule, ReactiveFormsModule, NgIf],
	providers: [MessageService],
	host: { class: 'field-quill-editor' },
	templateUrl: './field-quill-editor.component.html',
	styleUrl: './field-quill-editor.component.scss'
})
export class FiledQuillEditorComponent {
	@Input() field: InputBase<any>
	@Input() form: FormGroup
	@Input() submitted: boolean
	@Input() isMultiRow: boolean
	htmlstring: string = ''
	// colDefine: any = { 'tbname': 'tb_ioffice_News', 'colname': 'Thumbnail' };
	appImageUrl: string = AppConfig.config.apis.appImageUrl
	constructor(
		private _baseService: BaseService,
		private _spinner: NgxSpinnerService,
		private _messageService: MessageService
	) {}
	ngOnInit(): void {}
	meQuillRef: any
	quillConfig = {
		toolbar: {
			container: [
				// [{ font: [] }],
				// [{ size: ['small', false, 'large', 'huge'] }]
				[{ size: fontSizeStyle.whitelist }],
				['bold', 'italic', 'underline', 'strike'],
				// [{ header: 1 }, { header: 2 }],
				[{ color: [] }, { background: [] }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
				['link', 'image', 'video']
			],
			handlers: {
				image: (image) => {
					this.customImageUpload(image)
				}
			}
		},
		VideoResize: {},
		htmlEditButton: {},
		blotFormatter: {},
		imageDropAndPaste: {
			handler: (dataUrl: string | ArrayBuffer, type: string, imgData: ImageData) => {
				this.customImageCopy(dataUrl)
			}
		}
	}
	getMeEditorInstance(editorInstance: any, value): void {
		this.meQuillRef = editorInstance
		// const toolbar = this.meQuillRef.getModule('toolbar');
		// toolbar.addHandler('image', this.customImageUpload);
		// this.meQuillRef.clipboard.dangerouslyPasteHTML(this.form.value[this.field.Name]);
	}
	async customImageCopy(dataUrl) {
		this._spinner.show()
		let [errUpload, respUpload] = await this._baseService.getDataAPIDefault_Promise(
			'/api/data/process/base64tosrc',
			{
				tbname: CryptoExtension.encode(this.field.tbname),
				colname: CryptoExtension.encode(this.field.Name),
				dataUrl: dataUrl
			}
		)
		this._spinner.hide()
		if (errUpload) {
			this._messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng kiểm tra dữ liệu' })
		}
		if (respUpload.data.length == 0) {
			return
		}
		const range = this.meQuillRef.getSelection(true)
		this.meQuillRef.insertEmbed(
			range.index,
			'image',
			this.appImageUrl + respUpload.data[0]['url'].replace('/thumb', '')
		)
	}
	customImageUpload(image: any) {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.setAttribute('multiple', '')
		input.click()
		input.onchange = async () => {
			const files = input.files
			if (files) {
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
				let dataSplit = respUpload.data[0][this.field.Name].split(';')
				if (dataSplit.length == 0) {
					return
				}
				dataSplit.forEach((row) => {
					const range = this.meQuillRef.getSelection(true)
					this.meQuillRef.insertEmbed(range.index, 'image', this.appImageUrl + row.replace('/thumb', ''))
				})
				this.form.controls[this.field.Name].setValue(this.meQuillRef.root.innerHTML)
			}
		}
	}
}
