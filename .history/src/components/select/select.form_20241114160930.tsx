import React, {useEffect} from 'react';
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
    setError, // To manually trigger form errors
    formState: {errors},
  } = useFormContext(); // Access form context

  const styles = useStyleSheet(themedStyle);

  const selectOptions = placeholder
    ? [{[titleField]: placeholder, [valueField]: -1}, ...data]
    : data;

  useEffect(() => {
    // Watch for changes in the field value, and set error if it's -1 (placeholder)
    if (control.getValues(name) === -1) {
      setError(name, {
        type: 'manual',
        message: 'Please select a valid option.',
      });
    }
  }, [control, name, setError]); // Only run when control or name changes

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

        const isPlaceholder = field.value === -1;

        // Handle onSelect action
        const handleSelect = (index: IndexPath) => {
          const selectedValue = selectOptions[index.row][valueField];

          if (selectedValue === -1) {
            // If placeholder is selected, trigger the error
            setError(name, {
              type: 'manual',
              message: 'Please select a valid option.',
            });
          } else {
            // Otherwise, update the field value
            field.onChange(selectedValue);
          }
        };

        return (
          <View style={{marginBottom: 20}}>
            <Select
              {...field}
              selectedIndex={selectedIndex}
              placeholder={placeholder}
              value={
                selectOptions?.find(op => op[valueField] === field.value)?.[
                  titleField
                ]
              }
              onSelect={handleSelect}
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
