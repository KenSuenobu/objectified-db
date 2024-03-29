import { NextPage } from "next";
import {
  Button, Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, FormControlLabel, InputLabel, Select, SelectChangeEvent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material';
import {Box, Stack} from '@mui/system';
import {StackItem} from '../../components/StackItem';
import {CheckBox, CheckBoxOutlineBlank, Delete, EditOutlined} from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import LoadingMessage from '../../components/LoadingMessage';
import MenuItem from '@mui/material/MenuItem';
import {errorDialog} from '../../components/dialogs/ConfirmDialog';
import {loadDataTypes} from "../../components/data/dataTypes";
import ArrayManager from "../../components/common/ArrayManager";
import SectionHeader from "../../components/SectionHeader";

const DataTypes: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [dataTypes, setDataTypes] = useState([]);
  const [dataType, setDataType] = useState('');
  const [isArray, setIsArray] = useState(false);
  const [addDataTypeShowing, setAddDataTypeShowing] = useState(false);
  const nameRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const maxLengthRef = useRef<HTMLInputElement>();
  const patternRef = useRef<HTMLInputElement>();
  const enumValuesRef = useRef<HTMLInputElement>();
  const enumDescriptionsRef = useRef<HTMLInputElement>();
  const examplesRef = useRef<HTMLInputElement>();

  const reloadDataTypes = () => {
    setLoading(true);

    loadDataTypes(setDataTypes)
      .then(() => setLoading(false));
  }

  const addDataTypeClicked = () => {
    setAddDataTypeShowing(true);
  }

  const handleDataTypeChanged = (event: SelectChangeEvent) => {
    setDataType(event.target.value as string);
  }

  const handleIsArrayChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsArray(event.target.checked);
  }

  const validate = () => {
    const name = nameRef.current?.value ?? '';
    const description = descriptionRef.current?.value ?? '';

    if (name.length === 0) {
      errorDialog('A name is required');
      return false;
    }

    if (description.length === 0) {
      errorDialog('A description is required');
      return false;
    }

    return true;
  }

  const addDataType = () => {
    if (validate()) {
      const name = nameRef.current?.value ?? '';
      const description = descriptionRef.current?.value ?? '';
      const maxLength = maxLengthRef.current?.value;
      const pattern = patternRef.current?.value ?? '';
      const enumValues = enumValuesRef.current?.value ?? '';
      const enumDescriptions = enumDescriptionsRef.current?.value ?? '';
      const examples = examplesRef.current?.value ?? '';
      const dataTypeObject: any = {};

      dataTypeObject.name = name;
      dataTypeObject.description = description;
      dataTypeObject.enabled = true;
      dataTypeObject.maxLength = maxLength.length > 0 ? parseInt(maxLength) : 0;
      dataTypeObject.isArray = isArray;
      dataTypeObject.dataType = dataType;
      dataTypeObject.pattern = pattern;
      dataTypeObject.coreType = false;

      if (enumValues.length > 0) {
        dataTypeObject.enumValues = enumValues.split(',');
      }

      if (enumDescriptions.length > 0) {
        dataTypeObject.enumDescriptions = enumDescriptions.split(',');
      }

      if (examples.length > 0) {
        dataTypeObject.examples = examples;
      }

      axios.post('/app/data-types/create', dataTypeObject)
        .then((x) => {
          setAddDataTypeShowing(false);
          reloadDataTypes();
        })
        .catch((x) => {
          errorDialog(x.message);
        });
    }
  }

  useEffect(() => {
    reloadDataTypes();
  }, []);

  if (loading) {
    return (
      <LoadingMessage label={'Retrieving data types list, one moment ...'} />
    );
  }

  return (
    <>
      <div sx={{ width: '100%' }} style={{ border: '1px solid #ddd' }}>
        <Dialog open={addDataTypeShowing} fullWidth maxWidth={'sm'}>
          <DialogTitle>Data Type</DialogTitle>
          <DialogContent>
            <Stack direction={'column'} sx={{ padding: '1em' }}>

              <StackItem sx={{ width: '100%', padding: '4px' }}>
                <TextField id={'name'} label={'Name'} variant={'outlined'} required
                           fullWidth inputRef={nameRef}/>
              </StackItem>

              <StackItem sx={{ width: '100%', padding: '4px' }}>
                <TextField id={'description'} label={'Description'} variant={'outlined'}
                           required fullWidth inputRef={descriptionRef}/>
              </StackItem>

              <StackItem sx={{ width: '100%', padding: '4px' }}>
                <Stack direction={'row'}>
                  <StackItem sx={{ width: '25%', padding: '4px', verticalAlign: 'middle', paddingTop: '10px' }}>
                    <FormControlLabel control={<Checkbox checked={isArray} onChange={handleIsArrayChanged}/>} label={'Array of: '}/>
                  </StackItem>

                  <StackItem sx={{ width: '75%', padding: '4px' }}>
                    <FormControl fullWidth>
                      <InputLabel id={'data-type-label'} required>Native Data Type</InputLabel>
                      <Select labelId={'data-type-label'} id={'data_type'} label={'Native Data Type'}
                              onChange={handleDataTypeChanged} value={dataType}>
                        <MenuItem value={'STRING'}>STRING</MenuItem>
                        <MenuItem value={'INT32'}>INT32</MenuItem>
                        <MenuItem value={'INT64'}>INT64</MenuItem>
                        <MenuItem value={'FLOAT'}>FLOAT</MenuItem>
                        <MenuItem value={'DOUBLE'}>DOUBLE</MenuItem>
                        <MenuItem value={'BOOLEAN'}>BOOLEAN</MenuItem>
                        <MenuItem value={'DATE'}>DATE</MenuItem>
                        <MenuItem value={'DATE_TIME'}>DATE_TIME</MenuItem>
                        <MenuItem value={'BYTE'}>BYTE</MenuItem>
                        <MenuItem value={'BINARY'}>BINARY</MenuItem>
                        <MenuItem value={'PASSWORD'}>PASSWORD</MenuItem>
                        <MenuItem value={'OBJECT'}>OBJECT</MenuItem>
                      </Select>
                    </FormControl>
                  </StackItem>
                </Stack>
              </StackItem>

              <StackItem sx={{ width: '100%', padding: '4px' }}>
                <TextField id={'max_length'} label={'Maximum Input Length'} variant={'outlined'}
                           fullWidth inputRef={maxLengthRef}/>
              </StackItem>

              <StackItem sx={{ width: '100%', padding: '4px' }}>
                <TextField id={'pattern'} label={'Regexp Pattern'} variant={'outlined'}
                           fullWidth inputRef={patternRef}/>
              </StackItem>

              <ArrayManager setterCallback={() => {}} header={'Enumeration Values and Descriptions'} objectArray={[]}/>
              <ArrayManager setterCallback={() => {}} header={'Examples'} objectArray={[]}/>

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => addDataType()} variant={'contained'}>Add</Button>
            <Button onClick={() => setAddDataTypeShowing(false)} variant={'contained'} color={'error'}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <SectionHeader header={'Data Types'} onAdd={() => addDataTypeClicked()}>
          <Typography>
            Data Types define the types of data that can be stored in Objectified.  Data Types are not affected by any
            namespaces - they are global definitions used by all namespaces and objects.  Complex objects will show in
            this list (ie. object properties) so those names should remain unique.
          </Typography>
        </SectionHeader>

        <TableContainer component={Box}>
          <Table sx={{ minWidth: 650, backgroundColor: '#fff' }} aria-label={'datatype table'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd', textAlign: 'center' }}>Enabled</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>Create Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderTop: '1px solid #ddd' }}>Update Date</TableCell>
                <TableCell sx={{ borderTop: '1px solid #ddd' }}></TableCell>
              </TableRow>
            </TableHead>
            {dataTypes.map((row) => (
              <TableRow hover>
                <TableCell sx={{ color: '#000' }}>{row.id}</TableCell>
                <TableCell sx={{ color: '#000' }}>{row.name}</TableCell>
                <TableCell sx={{ color: '#000' }}>{row.description}</TableCell>
                <TableCell sx={{ color: '#000' }}>{row.data_type}</TableCell>
                <TableCell sx={{ color: '#000', textAlign: 'center' }}>{row.enabled ? <CheckBox/> : <CheckBoxOutlineBlank/>}</TableCell>
                <TableCell sx={{ color: '#000' }}>{row.create_date}</TableCell>
                <TableCell sx={{ color: '#000' }}>{row.update_date}</TableCell>
                <TableCell align={'right'}>{row.core_type ? (<></>) : (
                  <>
                    <EditOutlined/>&nbsp;
                    <Delete sx={{ color: 'red' }}/>
                  </>
                )}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default DataTypes;
