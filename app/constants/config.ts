import path from 'path'

/**
 * The path to the JSON file where form data will be stored.
 */
export const DATA_FILE_PATH = path.join(process.cwd(), 'app', 'api', 'data', 'formData.json')

export const DIR_FILE_PATH = path.dirname(DATA_FILE_PATH) // The path to the directory where the JSON file resides
