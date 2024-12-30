import { prisma } from '@app/prisma/index'
import { Image } from '@prisma/client'

import { Jimp } from 'jimp'

export async function getAll (): Promise<any> {
  return await prisma.image.findMany()
}

export async function resize (image: Express.Multer.File, width: number, height: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.resize({ w: width, h: height })

  const extension: string = image.mimetype.split('/')[1]
  const fileName: string = `public/${generateUniqueFilename(image)}`
  await jimpImage.write(`${fileName}.${extension}`)

  return await prisma.image.create({
    data: {
      title: image.originalname.split('.')[0],
      url: `${fileName}.${extension}`
    }
  })
}

export async function fisheye (image: Express.Multer.File, radius: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.fisheye({ radius })

  const extension: string = image.mimetype.split('/')[1]
  const fileName: string = `public/${generateUniqueFilename(image)}`
  await jimpImage.write(`${fileName}.${extension}`)

  return await prisma.image.create({
    data: {
      title: image.originalname.split('.')[0],
      url: `${fileName}.${extension}`
    }
  })
}

export async function blur (image: Express.Multer.File, blur: number): Promise<Image> {
  const jimpImage = await Jimp.fromBuffer(image.buffer)
  jimpImage.blur(blur)

  const extension: string = image.mimetype.split('/')[1]
  const fileName: string = `public/${generateUniqueFilename(image)}`
  await jimpImage.write(`${fileName}.${extension}`)

  return await prisma.image.create({
    data: {
      title: image.originalname.split('.')[0],
      url: `${fileName}.${extension}`
    }
  })
}

// Función para generar un nombre único
function generateUniqueFilename (file: Express.Multer.File): string {
  const randomString = Math.random().toString(36).substring(2, 10)
  const filename: string = file.originalname.split('.')[0]

  return `${filename}-${randomString}`
}
