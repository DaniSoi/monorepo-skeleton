# Config Library

Main purposes:

1) validation of config file
2) using config variables over the app
3) using config variables in libs 

## Config file

To be able to use `ConfigModule` and `ConfigService` each app should have a config directory 
that includes `config.development.ts`, `config.production.ts`,`types.ts`,`config.schema.ts`

### For example 

#####`config.development.ts`
```ecmascript 6
import { json } from 'body-parser'
import { parseBoolean, parseNumber } from '@trade-robot/config'

export default () => ({
    app: {
        port: parseNumber(process.env.PORT) || 3002,
    },
    libs: {
        db: {
            uri: process.env.MONGODB_URI || 'mongodb://localhost:27117/example',
        }
    }
})


```


#####`config.schema.ts`
```ecmascript 6
import * as Joi from 'joi'

export const configSchema = Joi.object({
    app: {
        limit: Joi.required()
    }
}).required().unknown()

```

#### NOTE: each variable that is being added to the config file, should exist in the schema as well   

### using ConfigModule in the app level 

```ecmascript 6
import { Module } from '@nestjs/common'
import { ExampleLibModule } from '@trade-robot/example-lib'
import { ConfigModule } from '@trade-robot/config'

import config, { configSchema } from '../config'

@Module({
    imports: [
        ConfigModule.forRoot(config(),configSchema),
        ExampleLibModule.register(config.libs.exampleLib),
    ],
})
export class AppModule {}


```

To be able to use the config variables on the level of the app, you should import ConfigModule and pass the config file and the schema.
Then you can use ConfigService:  


```ecmascript 6
import { ConfigService } from '@trade-robot/config'

@Injectable()
export class SomeService {
    constructor(
        private configService: ConfigService
    ){}
    
    someFunction() {
        this.configService.get('github')
    }    
}

```
#### NOTE: this.configService.get(path?) it is possible to give the get function a path, and it returns the specific path in the object (or undefined if path not found). If path is not given, the complete config object will be returned.  

### Using ConfigModule in libs level 

Each library should have a `config.schema.ts`
This schema should contain all the env variables that this library needs
```ecmascript 6
import * as Joi from 'joi'

export const configSchema = Joi.object({
    prefix: Joi.string().required(),
    debug: Joi.boolean().required(),
    playground: Joi.boolean().required(),
}).required()
```

Import ConfigModule in the app.module that imports the library and pass the config file

```ecmascript 6
import { Module } from '@nestjs/common'
import { ConfigModule } from '@trade-robot/config'

import config, { configSchema } from '../config'

@Module({
    imports: [
        ConfigModule.forRoot(config(),configSchema),
    ],
})
export class AppModule {}
```

Then inject it using standard constructor injection:

```ecmascript 6
    constructor(
        private configService: ConfigService,
    ){}
```

And use it inside the class:

```ecmascript 6
const qlConfig = this.configService.get('libs.ql')
```
Then it is possible to use ConfigService inside the lib.
