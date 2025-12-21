import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { DecimalPlaces } from '@core/libs/form-builder/resources'

@Directive({
	selector: '[Currency]',
	standalone: true
})
export class CurrencyDirective {
	@Input() currencyCode!: string
	@Input() formatType!: number

	constructor(private el: ElementRef) {
		this._transformOnLoad()
	}

	@HostListener('focus') onFocus() {
		this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9.-]+/g, '')
	}

	@HostListener('blur') onBlur() {
		let value: number = parseFloat(this.el.nativeElement.value)
		if (!isNaN(value)) {
			this.el.nativeElement.value = this._transform(value, this.currencyCode, this.formatType)
		}
	}

	@HostListener('input', ['$event.target.value']) onInput(value: string) {
		this.el.nativeElement.value = value.replace(/[^0-9.-]+/g, '')
	}

	/**
	 * @return {string}
	 */
	private _transformOnLoad() {
		setTimeout(() => {
			let value: number = parseFloat(this.el.nativeElement.value)
			if (!isNaN(value)) {
				this.el.nativeElement.value = this._transform(value, this.currencyCode, this.formatType)
			}
		})
	}

	/**
	 * @param {number} value
	 * @param {string} code
	 * @param {number=} format
	 * @return {string}
	 */
	private _transform(value: number | string, code?: string, format?: DecimalPlaces): string {
		if (value === null || value === undefined || isNaN(+value)) {
			return ''
		}
		let minimumFractionDigits
		switch (format) {
			case DecimalPlaces.NoDecimal:
				minimumFractionDigits = 0
				break
			case DecimalPlaces.OneDecimal:
				minimumFractionDigits = 1
				break
			case DecimalPlaces.TwoDecimals:
				minimumFractionDigits = 2
				break
			case DecimalPlaces.ThreeDecimals:
				minimumFractionDigits = 3
				break
			case DecimalPlaces.FourDecimals:
				minimumFractionDigits = 4
				break
			case DecimalPlaces.FiveDecimals:
				minimumFractionDigits = 5
				break
			case DecimalPlaces.SixDecimals:
				minimumFractionDigits = 6
				break
		}

		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: code,
			minimumFractionDigits: minimumFractionDigits
		}).format(Number(value))
	}
}
