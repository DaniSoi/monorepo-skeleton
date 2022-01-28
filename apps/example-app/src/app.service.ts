import { Injectable } from '@nestjs/common'
import { ExampleLibService } from '@example/example-lib'
import { ConfigService } from '@example/config'

@Injectable()
export class AppService {
  constructor(
      private configService: ConfigService,
      private exampleLibService: ExampleLibService
  ) {}

  getHello(): string {
    const greet = this.exampleLibService.getGreet()
    const greetSuffix = this.configService.get('app.greetSuffix')
    const fullGreet = `${greet} ${greetSuffix}`
    console.log(fullGreet)
    return fullGreet
  }
}
