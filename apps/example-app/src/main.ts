import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@example/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = await app.resolve(ConfigService)
  const { port } = configService.get('app')
  await app.listen(port)
  console.log(`listening on port ${port}`)
}
bootstrap()
