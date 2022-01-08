import { ExampleLibModule } from '@example/example-lib'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ ExampleLibModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
