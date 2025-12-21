import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

export const validateLogin = (email, passWord, setValidationMsg) => {
	const msg = {}
	if (isEmpty(email)) {
		msg.emailLogin = 'AUTH.VALIDATOR.MISS_EMAIL'
	} else if (!isEmail(email)) {
		msg.emailLogin = 'AUTH.VALIDATOR.INVALID_EMAIL'
	}
	if (isEmpty(passWord)) {
		msg.passWordLogin = 'AUTH.VALIDATOR.MISS_PASSWORD'
	}

	setValidationMsg(msg)
	if (Object.keys(msg).length > 0) return false
	return true
}

export const validateRegister = (name, email, passWord, setValidationMsg) => {
	const msg = {}
	if (isEmpty(name)) {
		msg.nameRegister = 'AUTH.VALIDATOR.MISS_NAME'
	}
	if (isEmpty(email)) {
		msg.emailRegister = 'AUTH.VALIDATOR.MISS_EMAIL'
	} else if (!isEmail(email)) {
		msg.emailRegister = 'AUTH.VALIDATOR.INVALID_EMAIL'
	}
	if (isEmpty(passWord)) {
		msg.passWordRegister = 'AUTH.VALIDATOR.MISS_PASSWORD'
	}
	setValidationMsg(msg)
	if (Object.keys(msg).length > 0) return false
	return true
}

export const validateForgotPassword = (email, setValidationMsg) => {
	const msg = {}
	if (isEmpty(email)) {
		msg.emailLogin = 'AUTH.VALIDATOR.MISS_EMAIL'
	} else if (!isEmail(email)) {
		msg.emailLogin = 'AUTH.VALIDATOR.INVALID_EMAIL'
	}

	setValidationMsg(msg)
	if (Object.keys(msg).length > 0) return false
	return true
}

export const validateResetPassword = (passWord, setValidationMsg) => {
	const msg = {}
	if (isEmpty(passWord)) {
		msg.passWord = 'AUTH.VALIDATOR.MISS_PASSWORD'
	}

	setValidationMsg(msg)
	if (Object.keys(msg).length > 0) return false
	return true
}
