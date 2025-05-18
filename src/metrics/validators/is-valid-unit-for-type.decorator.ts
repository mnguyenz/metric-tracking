import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { AllowedUnitsMap, MetricType } from '../constants/unit.constant';

export function IsValidUnitForType(typeProperty: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidUnitForType',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [typeProperty],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [typePropertyName] = args.constraints;
                    const typeValue = (args.object as any)[typePropertyName] as MetricType;

                    if (!typeValue || !AllowedUnitsMap[typeValue]) {
                        return false;
                    }

                    return AllowedUnitsMap[typeValue].includes(value as never);
                }
            }
        });
    };
}
