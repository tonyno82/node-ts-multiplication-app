
const originalArgv = process.argv

const runCommand = async( args: string[] ) => {
    process.argv = [...process.argv, ...args ]
    const {yarg} = await import('../../src/plugins/yargs.plugin')

    return yarg
}


describe('yargs.plugin.ts', () => { 
    beforeEach(() => {
        process.argv = originalArgv
        jest.resetModules()
    })

    test('should return default values', async() => { 
        const argv = await runCommand(['-b', '5']);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))

     })

     test('should return configuracion with custom values', async() => { 

        const argv = await runCommand([
            '-b', '10', 
            '-l', '20', 
            '-s', 
            '-n', 'custom-table', 
            '-d', 'custom-output'
        ]);
        expect(argv).toEqual(expect.objectContaining({
            b: 10,
            l: 20,
            s: true,
            n: 'custom-table',
            d: 'custom-output',
        }))
      })

 })