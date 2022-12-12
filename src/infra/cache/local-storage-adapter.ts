import { SetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }
}
