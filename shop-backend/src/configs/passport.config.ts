import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import {
	Strategy as FacebookStrategy,
	Profile as FacebookProfile
} from 'passport-facebook'
import EnvConfig from './env.config'

export default function PassportConfig() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: EnvConfig.passportGoogle.clientID || '',
				clientSecret: EnvConfig.passportGoogle.clientSecret || '',
				callbackURL: `${EnvConfig.server.urlBackEnd}/api/v1/client/auth/google/callback`
			},
			(accessToken) => {
				console.log(accessToken, 'Google accessToken')
			}
		)
	)

	passport.use(
		new FacebookStrategy(
			{
				clientID: EnvConfig.passportFacebook.clientID || '',
				clientSecret: EnvConfig.passportFacebook.clientSecret || '',
				callbackURL: `${EnvConfig.server.urlBackEnd}/api/v1/client/auth/facebook/callback`
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: FacebookProfile,
				cb: (error: any, user?: any) => void
			) => {
				try {
					// const [user, created] = await db.User.findOrCreate({
					// 	where: { facebookId: profile.id }
					// })
					const user = null
					return cb(null, user)
				} catch (error) {
					return cb(error)
				}
			}
		)
	)
}
