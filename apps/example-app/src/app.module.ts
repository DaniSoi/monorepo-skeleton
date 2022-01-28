import { ConfigModule } from '@example/config'
import { ExampleLibModule } from '@example/example-lib'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import config, { configSchema } from './config'

@Module({
    imports: [
        ExampleLibModule,
        ConfigModule.forRoot(config(), configSchema),
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ]
})
export class AppModule {}
