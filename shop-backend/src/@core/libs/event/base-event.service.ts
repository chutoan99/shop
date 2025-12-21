import { AppEvent } from '@core/interfaces'

export abstract class BaseEventService {
	abstract execute(event: AppEvent<any>): void
}
