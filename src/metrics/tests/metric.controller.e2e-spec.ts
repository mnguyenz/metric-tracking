import { faker } from '@faker-js/faker/.';
import { TestHelper } from '~core/tests/test.helper';
import { UserEntity } from '~entities/user.entity';
import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { TemperatureUnitEnum } from '~metrics/enums/temperature-unit.enum';
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
        it('Should create metric succesfully', async () => {
            const createMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-16'
            };
            const { body } = await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(createMetricDto)
                .isCreated();
            expect(body.id).toBeDefined();
            expect(body.type).toBe(createMetricDto.type);
            expect(body.value).toBe(createMetricDto.value);
            expect(body.unit).toBe(createMetricDto.unit);
            expect(body.date).toBe(createMetricDto.date);
            expect(Number(body.userId)).toBe(everfitAdmin.id);
            expect(body.createdAt).toBeDefined();
        });

        it('Should throw error when type and unit are not matching', async () => {
            const errorCreateMetricDto1 = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: TemperatureUnitEnum.CELSIUS,
                date: '2025-05-16'
            };
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(errorCreateMetricDto1)
                .isBadRequestError();

            const errorCreateMetricDto2 = {
                type: MetricTypeEnum.TEMPERATURE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-16'
            };
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(errorCreateMetricDto2)
                .isBadRequestError();
        });
    });

    describe('getMetricsByType', () => {
        let value: number;
        it('Should get list of metrics of admin succesfully', async () => {
            const { body: response1 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.DISTANCE, userId: everfitAdmin.id })
                .isOk();
            value = response1[0].value;
            expect(response1.length).toBe(1);
            expect(response1[0].unit).toBe(DistanceUnitEnum.METER);

            const { body: response2 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.TEMPERATURE, userId: everfitAdmin.id })
                .isOk();
            expect(response2.length).toBe(0);
        });

        it('Should only retrieve data from query user', async () => {
            const newUser = await userTestHelper.createUser();
            const createDistanceMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-19'
            };
            await testHelper.post('/metrics').query({ userId: newUser.id }).send(createDistanceMetricDto).isCreated();
            const createTemplateMetricDto = {
                type: MetricTypeEnum.TEMPERATURE,
                value: faker.number.float(),
                unit: TemperatureUnitEnum.CELSIUS,
                date: '2025-05-19'
            };
            await testHelper.post('/metrics').query({ userId: newUser.id }).send(createTemplateMetricDto).isCreated();

            const { body: response1 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.DISTANCE, userId: everfitAdmin.id })
                .isOk();
            expect(response1.length).toBe(1);

            const { body: response2 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.TEMPERATURE, userId: everfitAdmin.id })
                .isOk();
            expect(response2.length).toBe(0);

            const { body: response3 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.DISTANCE, userId: newUser.id })
                .isOk();
            expect(response3.length).toBe(1);

            const { body: response4 } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.TEMPERATURE, userId: newUser.id })
                .isOk();
            expect(response4.length).toBe(1);
        });

        it('Should convert to unit type succesfully', async () => {
            const { body } = await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.DISTANCE, userId: everfitAdmin.id, unit: DistanceUnitEnum.CENTIMETER })
                .isOk();
            expect(body.length).toBe(1);
            expect(body[0].unit).toBe(DistanceUnitEnum.CENTIMETER);
            expect(body[0].value).toBeCloseTo(value * 100);
        });

        it('Should throw error when type and unit are not matching', async () => {
            await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.DISTANCE, userId: everfitAdmin.id, unit: TemperatureUnitEnum.CELSIUS })
                .isBadRequestError();
            await testHelper
                .get('/metrics/get-by-type')
                .query({ type: MetricTypeEnum.TEMPERATURE, userId: everfitAdmin.id, unit: DistanceUnitEnum.FEET })
                .isBadRequestError();
        });
    });

    describe('getMetricsChart', () => {
        it('Should get list of metrics of admin succesfully', async () => {
            const { body: response1 } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            expect(response1.length).toBe(1);
        });

        it('Should only retrieve data from query user and limit between start and end time', async () => {
            const newUser = await userTestHelper.createUser();
            const { body: response1 } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: newUser.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            expect(response1.length).toBe(0);

            const createDistanceMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-19'
            };
            await testHelper.post('/metrics').query({ userId: newUser.id }).send(createDistanceMetricDto).isCreated();
            const { body: response2 } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: newUser.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            expect(response2.length).toBe(1);

            const { body: response3 } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            expect(response3.length).toBe(1);

            const createMetricDtoForAdmin = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-04-30'
            };
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(createMetricDtoForAdmin)
                .isCreated();
            const { body: response4 } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            expect(response4.length).toBe(1);
        });

        it('It should get latest data on date only', async () => {
            const earlyDistanceMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-18'
            };
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(earlyDistanceMetricDto)
                .isCreated();
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(earlyDistanceMetricDto)
                .isCreated();

            const latestDistanceMetricDto = {
                type: MetricTypeEnum.DISTANCE,
                value: faker.number.float(),
                unit: DistanceUnitEnum.METER,
                date: '2025-05-18'
            };
            await testHelper
                .post('/metrics')
                .query({ userId: everfitAdmin.id })
                .send(latestDistanceMetricDto)
                .isCreated();
            const { body } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20'
                })
                .isOk();
            const dataOnSpecificDate = body.filter((metric) => metric.date === '2025-05-18');
            expect(dataOnSpecificDate.length).toBe(1);
            expect(dataOnSpecificDate[0].date).toBe('2025-05-18');
            expect(Number(dataOnSpecificDate[0].value)).toBeCloseTo(latestDistanceMetricDto.value);
        });

        it('Should convert to unit type succesfully', async () => {
            const { body } = await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20',
                    unit: DistanceUnitEnum.CENTIMETER
                })
                .isOk();
            for (const metric of body) {
                expect(metric.unit).toBe(DistanceUnitEnum.CENTIMETER);
            }
        });

        it('Should throw error when type and unit are not matching', async () => {
            await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.DISTANCE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20',
                    unit: TemperatureUnitEnum.CELSIUS
                })
                .isBadRequestError();
            await testHelper
                .get('/metrics/chart')
                .query({
                    type: MetricTypeEnum.TEMPERATURE,
                    userId: everfitAdmin.id,
                    startDate: '2025-05-01',
                    endDate: '2025-05-20',
                    unit: DistanceUnitEnum.FEET
                })
                .isBadRequestError();
        });
    });
});
