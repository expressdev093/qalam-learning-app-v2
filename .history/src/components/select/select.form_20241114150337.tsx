import React from 'react';
import {
  IndexPath,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
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

  const styles = useStyleSheet(themedStyle);

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
            ? new IndexPath(
                selectOptions.findIndex(op => op[valueField] === field.value),
              )
            : new IndexPath(0);
        return (
          <View style={{marginBottom: 20}}>
            <Select
              {...(field as any)}
              selectedIndex={selectedIndex}
              placeholder={placeholder}
              value={
                selectOptions?.find(op => op[valueField] === field.value)?.[
                  titleField
                ]
              }
              onSelect={(index: IndexPath) => {
                field.onChange(selectOptions[index.row][valueField]);
              }}
              style={styles.select}>
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

const themedStyle = StyleService.create({
  select: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: 5,
    width: '100%',
  },
});
