enum AppLifecycle {
	MODULE_INIT = 'MODULE_INIT',
	APP_BOOTSTRAP = 'APP_BOOTSTRAP'
}
export interface OnModuleInit {
	onModuleInit(): void | Promise<void>
}

export interface OnApplicationBootstrap {
	onApplicationBootstrap(): void | Promise<void>
}
