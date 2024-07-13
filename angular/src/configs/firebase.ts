import { environment } from '../environments/environment'
export const fireBaseConfig = {
	production: false,
	firebase: {
		apiKey: environment.firebase.apiKey,
		authDomain: environment.firebase.authDomain,
		projectId: environment.firebase.projectId,
		storageBucket: environment.firebase.storageBucket,
		messagingSenderId: environment.firebase.messagingSenderId,
		appId: environment.firebase.appId,
		measurementId: environment.firebase.measurementId
	}
}
