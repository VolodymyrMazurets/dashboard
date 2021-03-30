import { AccountType } from '../../types/entities';

export class StorageService {
  private alias = {
    user: 'user',
    theme: 'theme',
  };

  set account(account: AccountType | null) {
    if (account) {
      localStorage.setItem(this.alias.user, JSON.stringify(account));
    } else {
      localStorage.removeItem(this.alias.user);
    }
  }
  get account(): AccountType | null {
    const data: string | null = localStorage.getItem(this.alias.user);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }
  set theme(theme: boolean | null) {
    if (theme) {
      localStorage.setItem(this.alias.theme, JSON.stringify(theme));
      console.log('theme')
    } else {
      localStorage.removeItem(this.alias.theme);
    }
  }
  get theme(): boolean | null {
    const data: string | null = localStorage.getItem(this.alias.theme);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }
}

export const storageService = new StorageService();
