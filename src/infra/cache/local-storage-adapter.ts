import { SetStorage } from '@/data/protocols'

export class LocaStorageAdapter implements SetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
