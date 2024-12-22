import {useList} from '@refinedev/core';
import {
  IndexPath,
  Select,
  SelectItem,
  useStyleSheet,
} from '@ui-kitten/components';
import {FormikProps} from 'formik';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IPastPaper, ISubject} from '../../interfaces';

export interface PaperFormProps {
  subjectId?: number;
  year?: string;
}

// const subjects = [
//   {id: 0, name: 'Select subject'},
//   {id: 1, name: 'Maths'},
//   {id: 2, name: 'Physics'},
//   {id: 3, name: 'Biology'},
//   {id: 4, name: 'Chemistry'},
// ];

// const sessions = [
//   {id: 0, name: 'Select session'},
//   {id: 1, name: '2018'},
//   {id: 2, name: '2019'},
// ];

type Props = {
  onSubmit: (values: PaperFormProps) => void;
};

export const PastPaperForm: React.FC<Props> = ({onSubmit}) => {
  const [subjectSelectedIndex, setSubjectSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const [sessionSelectedIndex, setSessionSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const styles = useStyleSheet(themedStyle);
  const subjectState = useList<ISubject>({
    resource: 'subjects',
    filters: [
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });

  const subjects = subjectState.data?.data || [];

  // const {data: yearsData = []} = Api.useGetPastPaperYearsQuery();
  const pastPapersState = useList<IPastPaper>({
    resource: 'past-papers',
    filters: [
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });

  const pastPapers = pastPapersState.data?.data;
  const sessions = useMemo(() => {
    if (pastPapers) {
      return pastPapers.map((paper, index) => ({
        id: index + 1,
        name: '' + paper.year,
      }));
    }
    return [];
  }, [pastPapers]);

  // const subjects = [
  //   {
  //     id: 0,
  //     name: 'Select Subject',
  //   },
  //   ...subjectsData.map(sub => ({id: sub.id, name: sub.name})),
  // ];

  // const sessions = [
  //   {id: 0, name: 'Select session'},
  //   ...yearsData.map((y, index) => ({id: index + 1, name: '' + y})),
  // ];

  const getErrorMessage = (errors: any, touched: any, name: string) => {
    const error = errors[name];
    const isTouched = touched[name];
    return error && isTouched ? error : undefined;
  };
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <Select
        placeholder={'Select subject'}
        selectedIndex={subjectSelectedIndex}
        value={subjects[subjectSelectedIndex.row]?.name}
        onSelect={(index: any) => {
          setSubjectSelectedIndex(new IndexPath(index.row));
          onSubmit({
            subjectId: subjects[index.row]?.id,
            year:
              sessionSelectedIndex.row !== 0
                ? sessions[sessionSelectedIndex.row]?.name
                : '0',
          });
        }}
        label={'Subject'}
        style={styles.select}>
        {subjects.map(board => (
          <SelectItem key={board.id} title={board.name} />
        ))}
      </Select>
      <View style={{width: 5}} />
      <Select
        selectedIndex={sessionSelectedIndex}
        value={sessions[sessionSelectedIndex.row]?.name}
        onSelect={(index: any) => {
          setSessionSelectedIndex(new IndexPath(index.row));
          onSubmit({
            subjectId: subjects[subjectSelectedIndex.row]?.id,
            year: index.row !== 0 ? sessions[index.row]?.name : '0',
          });
        }}
        label={'Session'}
        style={styles.select}>
        {sessions.map(grade => (
          <SelectItem key={grade.id} title={grade.name} />
        ))}
      </Select>
    </View>
  );
};

const themedStyle = StyleSheet.create({
  select: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingTop: 5,
    borderRadius: 10,
  },
});
