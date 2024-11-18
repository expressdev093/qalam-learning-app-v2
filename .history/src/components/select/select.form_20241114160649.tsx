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

interface SelectPFieldProps {
  name: string; // Name for the form field
  rules?: object; // Validation rules for the field
  data: any[]; // Data to populate SelectItem
  titleField?: string; // Field name to use for the title (displayed text)
  valueField?: string; // Field name to use for the value (used in form state)
  placeholder?: string; // Placeholder for Select dropdown
}

export const SelectField: React.FC<SelectPFieldProps> = ({
  name,
  rules,
  data,
  titleField = 'name',
  valueField = 'id',
  placeholder,
}) => {
  const {
    control,
    setError, // To manually trigger form errors
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
        const dataIndex = selectOptions.findIndex(
          op => op[valueField] === field.value,
        );
        const selectedIndex =
          dataIndex !== -1 ? new IndexPath(dataIndex) : new IndexPath(0);

        // Check if the selected value is -1 (placeholder value)
        const isPlaceholder = field.value === -1;

        // Trigger an error if the selected value is -1 (placeholder)
        if (isPlaceholder && fieldState?.isTouched) {
          setError(name, {
            type: 'manual',
            message: 'Please select a valid option.',
          });
        }

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
                const selectedValue = selectOptions[index.row][valueField];

                // Only trigger `onChange` if the selected value is not -1
                if (selectedValue !== -1) {
                  field.onChange(selectedValue);
                } else {
                  setError(name, {
                    type: 'manual',
                    message: 'Please select a valid option.',
                  });
                }
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
