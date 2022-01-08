import { Injectable } from '@nestjs/common'

@Injectable()
export class ExampleLibService {
    getGreet() {
        return 'Hello World!'
    }
}
