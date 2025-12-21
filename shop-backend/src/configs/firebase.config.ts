import EnvConfig from './env.config'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const admin = require('firebase-admin')

export default class FirebaseAdminConfig {
	private static instance: FirebaseAdminConfig | null = null

	public static async getInstance(): Promise<FirebaseAdminConfig> {
		if (!FirebaseAdminConfig.instance) {
			FirebaseAdminConfig.instance = new FirebaseAdminConfig()
			await FirebaseAdminConfig.instance._connect()
		}
		return FirebaseAdminConfig.instance
	}

	private async _connect(): Promise<void> {
		try {
			admin.initializeApp({
				credential: admin.credential.cert({
					type: EnvConfig.firebase.type,
					universe_domain: EnvConfig.firebase.universeDomain,
					auth_uri: EnvConfig.firebase.authUri,
					token_uri: EnvConfig.firebase.tokenUri,
					auth_provider_x509_cert_url:
						EnvConfig.firebase.authProviderX509CertUrl,
					client_id: EnvConfig.firebase.clientId,
					client_email: EnvConfig.firebase.clientEmail,
					project_id: EnvConfig.firebase.projectId,
					private_key_id: EnvConfig.firebase.privateKeyId,
					private_key: EnvConfig.firebase.privateKey,
					client_x509_cert_url: EnvConfig.firebase.clientX509CertUrl
				})
			})
			console.log('Firebase Admin initialized successfully.')
		} catch (error) {
			console.error('Firebase Admin initialization failed:', error)
		}
	}
}
