import { HS256Handler, IHashHandler } from './hashHandlers';

class HashMediator {
  provideHandler = (hashType: string): IHashHandler | null => {
    switch (hashType) {
      case 'HS256':
        return new HS256Handler();
      default:
        return null;
    }
  };
}

export default HashMediator;
