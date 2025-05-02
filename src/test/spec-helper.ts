export class SpecHelper {
  static initLifecycleHooks() {
    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  }
}
