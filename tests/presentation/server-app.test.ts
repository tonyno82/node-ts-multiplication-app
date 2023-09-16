import { ServerApp } from '../../src/presentation/server-app';
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';



describe('server-app.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destinacion',
        name: 'test-filename'
    }

    test('should create ServerApp instance', () => { 
        
        const serverApp = new ServerApp()
        expect( serverApp ).toBeInstanceOf(ServerApp)
        expect( typeof ServerApp.run ).toBe('function')
     })

     test('should run ServerApp with options', () => { 

        //! OJO estas pruebas crear carpeta y etc...
        //! El siguiente test lo hace mockeando todo

        const logSpy = jest.spyOn(console, 'log')
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')


        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('Server running ...')
        expect(logSpy).toHaveBeenCalledWith('File created!')

        expect(createTableSpy).toBeCalledTimes(1)
        expect(createTableSpy).toBeCalledWith({
            'base': options.base, 
            'limit': options.limit
        })
        expect(saveFileSpy).toBeCalledTimes(1)
        expect(saveFileSpy).toBeCalledWith({
            "fileContent": expect.any(String), 
            "fileDestination": options.destination,
            "fileName": options.name
        })

      })

    test('should run with custom values mocked', () => { 

        //! Parecido al anterior pero mockeando y sin crear carpetas


        const returnCreateMock = '1 x 2 = 2'
        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createMock = jest.fn().mockReturnValue(returnCreateMock)
        const saveFileMock = jest.fn().mockReturnValue(true)

        console.log = logMock
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith("Server running ...")
        expect(createMock).toBeCalledWith({
            "base": options.base, 
            "limit": options.limit
        })
        expect(saveFileMock).toBeCalledWith({
            "fileContent": returnCreateMock, 
            "fileDestination": options.destination, 
            "fileName": options.name
        })
        expect(logMock).toHaveBeenCalledWith("File created!")
        expect(logErrorMock).not.toHaveBeenCalled()


    })
})