import { SetStorage } from '@/data/protocols'
import { LocaStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage => new LocaStorageAdapter()
