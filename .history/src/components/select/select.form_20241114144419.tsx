import React from 'react';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {Controller, useFormContext} from 'react-hook-form';
import {Text, View} from 'react-native';

interface GenericSelectProps {
  name: string; // Name for the form field
  rules?: object; // Validation rules for the field
  data: any[]; // Data to populate SelectItem
  titleField?: string; // Field name to use for the title (displayed text)
  valueField?: string; // Field name to use for the value (used in form state)
  placeholder?: string; // Placeholder for Select dropdown
}

export const SelectField: React.FC<GenericSelectProps> = ({
  name,
  rules,
  data,
  titleField = 'name',
  valueField = 'id',
  placeholder,
}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext(); // Access form context

  const selectOptions = placeholder
    ? [{[titleField]: placeholder, [valueField]: -1}, ...data]
    : data;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => {
        const selectedIndex =
          field.value !== undefined
            ? new IndexPath(field.value)
            : new IndexPath(0);
        return (
          <View style={{marginBottom: 20}}>
            <Select
              {...(field as any)}
              selectedIndex={selectedIndex}
              placeholder={placeholder}
              value={data?.[field.value]?.[titleField]}
              onSelect={(index: IndexPath) => {
                console.log('selected index', index.row);
                console.log('value', data[index.row][valueField]);
                field.onChange(index.row);
              }}
              style={{width: '100%'}}>
              {/* Map through data to create select items */}
              {selectOptions.map((item: any, index: number) => (
                <SelectItem key={index} title={item[titleField]} />
              ))}
            </Select>

            {/* Error Message */}
            {fieldState?.error && (
              <Text style={{color: 'red', marginTop: 5}}>
                {fieldState?.error?.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};
