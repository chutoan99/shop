import { Component, Inject, Input } from '@angular/core'
import { ModalRef } from './modal-ref'
import { MODAL_DATA, StateModal } from './modal.config'
import { NgClass } from '@angular/common'
@Component({
	selector: 'app-modal',
	templateUrl: './modal.template.html',
	standalone: true,
	imports: [NgClass]
})
export class ModalComponent {
	constructor(
		private readonly _modalRef: ModalRef<ModalComponent, string>,
		@Inject(MODAL_DATA) public data: any
	) {}

	confirm() {
		this._modalRef.close(StateModal.confirmed)
	}

	cancel() {
		this._modalRef.close(StateModal.cancelled)
	}

	getConfirmButtonClass(): string {
		const actionClassMap: Record<string, string> = {
			delete: 'bg-[#FF3130] hover:bg-red-500 text-[white]',
			sign_out: 'bg-[#7e7ef4] hover:bg-[#5a5ae0] text-[white]',
			approve: 'bg-green-500 hover:bg-green-600 text-[white]',
			warning: 'bg-yellow-500 hover:bg-yellow-600 text-[white]'
		}

		return actionClassMap[this.data.action] ?? 'bg-[white]'
	}
}
