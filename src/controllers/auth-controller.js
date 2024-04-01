import { User } from '../models/user-model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const handleRegister = async (req, res) => {
	const { username, password } = req.body
	if (!username || !password)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' })

	try {
		const isDuplicate = await User.findOne({ username })
		if (isDuplicate) return res.sendStatus(409)

		const hashedPassword = await bcrypt.hash(password, 10)
		await User.create({ username, password: hashedPassword })

		res.status(201).json({ success: `New user ${username} created!` })
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ error: 'Failed to register' })
	}
}

export const handleLogin = async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: 'Username and password are required.' })
	}

	const foundUser = await User.findOne({ username }).exec()
	if (!foundUser) return res.sendStatus(401) //Unauthorized

	const match = await bcrypt.compare(password, foundUser.password)

	const accessToken = jwt.sign(
		{ userId: foundUser._id, username: foundUser.username },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30s' },
	)

	const refreshToken = jwt.sign(
		{ userId: foundUser._id },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1m' },
	)
	foundUser.refreshToken = refreshToken
	await foundUser.save()

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 70000,
	})

	if (match) {
		res.status(200).json({ accessToken })
	} else {
		res.sendStatus(401)
	}
}

export const handleRefreshToken = async (req, res) => {
	const token = req.cookies?.refreshToken

	if (!token) return res.sendStatus(401)

	const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
	if (!verifiedToken) {
		return res.sendStatus(403)
	}

	const user = await User.findById(verifiedToken.userId)
	if (user?.refreshToken !== token) return res.sendStatus(403)

	const accessToken = jwt.sign(
		{ userId: verifiedToken.userId },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30s' },
	)
	const refreshToken = jwt.sign(
		{ userId: verifiedToken.userId },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1m' },
	)
	await User.findByIdAndUpdate(verifiedToken.userId, { refreshToken })

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 70000,
	})

	res.json({ accessToken })
}
