import { prisma } from '@app/prisma/index'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { CreateUserDto } from './models/user.model'
import { User } from '@prisma/client'
import { HttpError, HttpStatusCode } from '@app/middlewares/error-handler/http-error'

export async function create (user: CreateUserDto): Promise<User> {
  return prisma.user.create({
    data: {
      username: user.username,
      password: user.password
    }
  })
}

export async function login (username: string, password: string): Promise<string> {
  // Finding user by email
  const existingUser = await prisma.user.findFirst({
    where: {
      username
    }
  })

  // If user email does not exist
  if (existingUser === null) {
    throw new HttpError(HttpStatusCode.NOT_FOUND, 'INVALID_CREDENTIALS', 'User does not exist')
  }

  // Checking password coincidence
  const isValid = await bcrypt.compare(password, existingUser.password)
  if (!isValid) {
    throw new HttpError(HttpStatusCode.NOT_FOUND, 'INVALID_CREDENTIALS', 'User does not exist')
  }

  // Returning JWT if everything is OK
  return jwt.sign(
    {
      user: existingUser.id
    },
    process.env.JWT_KEY ?? '',
    {
      expiresIn: '1h'
    }
  )
}
