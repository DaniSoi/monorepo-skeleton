import { Inject, Injectable, Scope } from '@nestjs/common'
import { get } from 'lodash'

@Injectable({ scope: Scope.TRANSIENT })
export class ConfigService {
    constructor(
        @Inject('CONFIG') private readonly internalConfig: Record<string, any>
    ) {}

    get(path?: string) {
        if (path) {
            return get(this.internalConfig, path)
        }
        return this.internalConfig
    }
}

