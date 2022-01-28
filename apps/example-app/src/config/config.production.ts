import { parseNumber } from '@example/config'

export default () => ({
    app: {
        port: parseNumber(process.env.PORT) || 80,
        greetSuffix: 'Test'
    },
    libs: {
        exampleLib: {
            great: 'Hello World!'
        },
    }
})
