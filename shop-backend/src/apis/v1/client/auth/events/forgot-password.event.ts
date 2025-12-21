import { AppEvent } from '@core/interfaces'
import { ForgotPasswordDto } from '../dtos'
import { IsString } from 'class-validator'

export class ForgotPasswordEventDto extends ForgotPasswordDto {
	@IsString()
	token!: string
}

export default class ForgotPasswordEvent extends AppEvent<ForgotPasswordEventDto> {
	static create(payload: ForgotPasswordEventDto, userId: number) {
		return new ForgotPasswordEvent('history-search', payload, {
			userId
		})
	}

	static from(json: any) {
		const { eventName, payload, id, occurredAt, userId } = json
		return new ForgotPasswordEvent(eventName, payload, {
			id,
			occurredAt,
			userId
		})
	}
}
