import { Module, HttpModule } from '@nestjs/common'

import { InternalHttpService } from './internal-http.service'

@Module({
  imports: [ HttpModule ],
  providers: [ InternalHttpService ],
  exports: [ InternalHttpService ],
})
export class InternalHttpModule {}
