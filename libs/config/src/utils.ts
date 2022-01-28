import { ObjectSchema as JoiObjectSchema } from 'joi'
import { Logger } from '@nestjs/common'
import { includes } from 'lodash'

import { ConfigObject } from './types'

export function parseBoolean(value?: string): boolean | undefined {
    if (!value) return

    return ([ '1', 'true' ].includes(value))
}

export function parseCommaSeparatedList(value?: string): Array<string> | undefined {
    if (!value) return

    return value.split(',')
}

export function parseNumber(value?: string): number | undefined {
    if (!value) return

    return Number.parseInt(value, 10)
}

export function parseDate(value?: string): Date | undefined {
    if (!value) return

    return new Date(value)
}

export function parseJSON(value?: string): any | undefined {
    if (!value) return

    return JSON.parse(value)
}

export function configValidation(globalConfig: ConfigObject, schema: JoiObjectSchema, pathName?: string) {
    const { value, error } = schema.validate(globalConfig)
    let errorMessage = ''
    if (error) {
        if (!globalConfig) {
            errorMessage = `Please add property ${pathName} in the config object!`
        } else {
            errorMessage = includes(error.message, 'not allowed') ? ` ${error.message} Please add property in the config schema if it's required !`
                : `${error.message}, Please add property in the config object or provide the Environment variable! `
        }
        Logger.error((`Config validation error: ${errorMessage} `))
        // TODO: add proper termination
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1)
    }

    return value
}
