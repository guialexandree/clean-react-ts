import { SetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  }
}
