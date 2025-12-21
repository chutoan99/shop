import {
	OnApplicationBootstrap,
	OnModuleInit
} from '@core/enums/app-lifecycle.enum'

export class LifecycleManager {
	private static moduleInits: OnModuleInit[] = []
	private static appBootstraps: OnApplicationBootstrap[] = []

	static register(instance: any) {
		if (typeof instance.onModuleInit === 'function') {
			this.moduleInits.push(instance)
		}

		if (typeof instance.onApplicationBootstrap === 'function') {
			this.appBootstraps.push(instance)
		}
	}

	static async runModuleInit() {
		for (const instance of this.moduleInits) {
			await instance.onModuleInit()
		}
	}

	static async runApplicationBootstrap() {
		for (const instance of this.appBootstraps) {
			await instance.onApplicationBootstrap()
		}
	}
}
