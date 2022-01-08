import { Module } from '@nestjs/common'

import { ExampleLibService } from './example-lib.service'

@Module({
  providers: [ ExampleLibService ],
  exports: [ ExampleLibService ],
})
export class ExampleLibModule {}
