import { User } from '../models/user-model.js'
import bcrypt from 'bcrypt'

export const handleRegister = async (req, res) => {
	const { username, password } = req.body
	if (!username || !password)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' })

	//check for duplicate username
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
