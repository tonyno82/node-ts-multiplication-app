import fs from 'fs'
import { yarg } from './plugins/yargs.plugin'
console.log(yarg)

const dividendo: number = 5
const divisor: Array<number> = [1,2,3,4,5,6,7,8,9]
const divisiones: string = "=".repeat(30)

let textoAImprimir: string = ""

const imprimeYConsola = (texto: string|number) => {
    const textoString = texto.toString() + '\n'
    textoAImprimir += textoString
    console.log(textoString)

}

imprimeYConsola(divisiones)
imprimeYConsola(`        Tabla del ${dividendo}`)
imprimeYConsola(divisiones)
divisor.forEach(divisor => {
    imprimeYConsola(`${dividendo} x ${divisor} = ${dividendo * divisor}`)
});
console.log(textoAImprimir)

const outputPath = `outputs`
fs.mkdirSync(outputPath, {recursive: true})
fs.writeFileSync(`${outputPath}/tabla-${dividendo}.txt`, textoAImprimir)