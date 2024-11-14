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
        // Get the index of the selected item based on field.value (which is an ID)
        const selectedIndex = data.findIndex(
          item => item[valueField] === field.value,
        );

        return (
          <View style={{marginBottom: 20}}>
            <Select
              {...(field as any)}
              selectedIndex={selectedIndex !== -1 ? selectedIndex : -1}
              onSelect={(index: any) =>
                field.onChange(
                  index.row === -1 ? null : data[index.row][valueField],
                )
              }
              placeholder={placeholder || 'Select an option'}
              style={{width: '100%'}}>
              {/* First item as placeholder */}
              <SelectItem title="Select an option" value={null} />

              {/* Map through data to create select items */}
              {data.map((item: any, index: number) => (
                <SelectItem
                  key={index}
                  title={item[titleField]}
                  value={item[valueField]} // Ensure `value` is passed
                />
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
