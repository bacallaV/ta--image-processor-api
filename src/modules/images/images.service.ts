import { prisma } from '@app/prisma/index'

export async function getAll (): Promise<any> {
  return await prisma.image.findMany()
}
