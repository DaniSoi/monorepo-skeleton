import { parseNumber } from '@example/config'

export default () => ({
    app: {
        port: parseNumber(process.env.PORT) || 3002,
        greetSuffix: 'Test',
    },
    libs: {
        exampleLib: {
            great: 'Hello World!',
        },
    },
})
