import { Injectable } from '@nestjs/common'
import { ExampleLibService } from '@example/example-lib'

@Injectable()
export class AppService {
  constructor(
      private exampleLibService: ExampleLibService
  ) {}

  getHello(): string {
    const greet = this.exampleLibService.getGreet()
    console.log(greet)
    return greet
  }
}
