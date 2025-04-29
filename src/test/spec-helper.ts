import { AppDataSource } from 'src/db/app-data-source';

export class SpecHelper {
  static initLifecycleHooks({
    simple = true,
    onSeed,
  }: { simple?: boolean; onSeed?: () => Promise<void> } = {}) {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    beforeEach(async () => {
      await AppDataSource.synchronize(true);
      if (!simple && onSeed) {
        await onSeed();
      }
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(async () => {
      jest.restoreAllMocks();
      await AppDataSource.destroy();
      console.log('Test DB closed');
    });
  }
}
