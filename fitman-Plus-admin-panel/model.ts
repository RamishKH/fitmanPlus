import { model, Schema } from 'mongoose'

export interface expert {
  name: string
  experience: number
  tags: number[]
  description: string
  videolink: string
  picture: string
  booking: string
}

export const expertSchema = new Schema<expert>({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  tags: { type: [Number], required: true },
  description: { type: String, required: true },
  videolink: { type: String, required: true },
  picture: { type: String, required: true },
  booking: { type: String, required: true },
})

export const expertModel = model<expert>('experts', expertSchema)
