import { Global, Module } from '@nestjs/common'

@Global()
@Module({
    providers: [
        {
            provide: 'CONFIG',
            useFactory: () => ({}),
        },
    ],
    exports: [
        'CONFIG',
    ],
})
export class ConfigHostModule {}
