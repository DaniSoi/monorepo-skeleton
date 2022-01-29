import { DynamicModule, Global, Logger, Module } from '@nestjs/common'
import { ObjectSchema as JoiObjectSchema } from 'joi'

import { ConfigObject } from './types'
import { ConfigService } from './config.service'
import { ConfigHostModule } from './config-host.module'
import { configValidation } from './utils'

@Global()
@Module({
    imports: [
        ConfigHostModule,
    ],
    exports: [
        ConfigHostModule,
        ConfigService,
    ],
})
export class ConfigModule {
    static readonly logger = new Logger(ConfigModule.name)

    static forRoot(globalConfig: ConfigObject, rootSchema: JoiObjectSchema): DynamicModule {
        const config = configValidation(globalConfig, rootSchema)

        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'CONFIG',
                    useValue: config,
                },
                ConfigService,
            ],
            exports: [
                ConfigService,
            ],
        }
    }
}

