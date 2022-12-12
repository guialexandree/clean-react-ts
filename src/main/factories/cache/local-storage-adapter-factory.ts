import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter()
