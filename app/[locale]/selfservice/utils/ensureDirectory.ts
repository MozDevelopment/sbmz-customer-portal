// app/utils/ensureDirectory.ts
import { DIR_FILE_PATH } from '@/app/constants/config'
import fs from 'fs/promises'

export async function ensureDirectoryExists() {
  try {
    await fs.mkdir(DIR_FILE_PATH, { recursive: true })
  } catch (error) {
    console.error('Error creating directory:', error)
    throw error
  }
}
