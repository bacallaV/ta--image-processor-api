import { prisma } from '@app/prisma/index'
import { Image } from '@prisma/client'

import { Jimp } from 'jimp'

export async function getAll (): Promise<any> {
  return await prisma.image.findMany()
}

export async function resize (image: Express.Multer.File, width: number, height: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.resize({ w: width, h: height })

  return await saveImage(image, jimpImage)
}

export async function fisheye (image: Express.Multer.File, radius: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.fisheye({ radius })

  return await saveImage(image, jimpImage)
}

export async function blur (image: Express.Multer.File, blur: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.blur(blur)

  return await saveImage(image, jimpImage)
}

async function saveImage (image: Express.Multer.File, jimpImage: Awaited<ReturnType<typeof Jimp.fromBuffer>>): Promise<Image> {
  const extension: string = image.mimetype.split('/')[1]
  const originalFileName: string = image.originalname.split('.')[0]
  const randomString = Math.random().toString(36).substring(2, 10)
  const fileName: string = `public/${originalFileName}-${randomString}`

  await jimpImage.write(`${fileName}.${extension}`)

  return await prisma.image.create({
    data: {
      title: originalFileName,
      url: `${fileName}.${extension}`
    }
  })
}
