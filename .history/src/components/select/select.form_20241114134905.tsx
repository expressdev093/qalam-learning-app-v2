import React from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
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

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => {
        console.log('SelectField', name, field, fieldState);
        return (
          <View style={{marginBottom: 20}}>
            <Select
              {...(field as any)}
              selectedIndex={field.value !== null ? field.value : -1}
              onSelect={
                (index: any) => {
                  console.log('selected index', index.row);
                  console.log('value', data[index][valueField]);
                }
                // field.onChange(
                //   index.row === -1 ? null : data[index.row][valueField],
                // )
              }
              placeholder={placeholder || 'Select an option'}
              style={{width: '100%'}}>
              {/* First item as placeholder */}
              <SelectItem title="Select an option" />

              {/* Map through data to create select items */}
              {data.map((item: any, index: number) => (
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
