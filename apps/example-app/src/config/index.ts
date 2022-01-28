import configDevelopment from './config.development'
import configProduction from './config.production'

export default () => {
    return process.env.ENV === 'production' ? configProduction() : configDevelopment()
}

export * from './config.schema'
