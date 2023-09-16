import { ServerApp } from '../src/presentation/server-app';

describe('app.test.ts', () => {

    test('should call Server.run with values', async() => {
        
        const options = [
            'node',
            'app.ts',
            '-b', '10',
            '-l', '5',
            '-s',
            '-n', 'test-file',
            '-d', 'test-destination'
        ]
        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock


        process.argv = options

        await import('../src/app')
        expect(serverRunMock).toBeCalledWith({
            'base': 10,
            "destination": "test-destination",
            "limit": 5,
            "name": "test-file",
            "showTable": true,
        })

    })

})