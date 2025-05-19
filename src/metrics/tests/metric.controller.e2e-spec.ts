import { TestHelper } from '~core/tests/test.helper';
import { UserEntity } from '~entities/user.entity';
import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { UserTestHelper } from '~users/tests/user-test.helper';

describe('MetricController (e2e)', () => {
    const testHelper = new TestHelper();
    let userTestHelper: UserTestHelper;
    let everfitAdmin: UserEntity;

    beforeAll(async () => {
        await testHelper.initialize();
        userTestHelper = testHelper.getTestHelperModule<UserTestHelper>(UserTestHelper);
        everfitAdmin = await userTestHelper.createUser('admin@everfit.io');
    });

    afterAll(async () => {
        await testHelper.close();
        jest.clearAllMocks();
    });

    describe('createOne', () => {
        it('Should create one succesfully', async () => {
            const createMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: 100,
                unit: DistanceUnitEnum.METER,
                date: '2025-05-16'
            };
            const { body } = await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(createMetricDto)
                .isCreated();
            console.log(body);
        });
    });
});
