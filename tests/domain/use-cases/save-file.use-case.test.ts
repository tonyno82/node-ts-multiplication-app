import fs from 'fs'
import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';


describe('save-file.use-case.ts', () => { 

    const custonOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }
    const customFilePath = `${custonOptions.fileDestination}/${custonOptions.fileName}.txt`

    beforeEach(() => {
        if (fs.existsSync('outputs')) fs.rmSync('outputs', {recursive: true})
        if (fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', {recursive: true})
    })
    
    afterEach(() => {
        if (fs.existsSync('outputs')) fs.rmSync('outputs', {recursive: true})
        if (fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', {recursive: true})
        jest.clearAllMocks()
    })

    test('should save file with default values', () => { 

        const saveFile = new SaveFile()
        const filePath = './outputs/table.txt'
        const options = {
            fileContent: 'test contect'
        }

        
        
        const result = saveFile.execute(options)
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
        
        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect( fileContent).toBe(options.fileContent)

     })

     test('should save file with custom values', () => {
         const saveFile = new SaveFile()


        const result = saveFile.execute(custonOptions)
        const fileExist = fs.existsSync(customFilePath)
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'})

        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect( fileContent).toBe(custonOptions.fileContent)
     })

     test('should return false if file directory clud not be created', () => {
        const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {
        })
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing')
        })
        const result = saveFile.execute(custonOptions)

        expect(result).toBeFalsy()
        mkdirSpy.mockRestore()

     })

     test('should return false if file could not be created', () => {

        const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {
        })
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing')
        })
        const result = saveFile.execute(custonOptions)

        expect(result).toBeFalsy()
        writeFileSpy.mockRestore()

     })
 })

