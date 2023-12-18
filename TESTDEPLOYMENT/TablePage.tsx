// import React, { useState } from 'react';
import * as React from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormHelperText,
} from '@mui/material';

interface UserData {
    id: number;
    title: string;
    description: string;
    status: string;
    createdDate: Date; 
}


const ColumnPage: React.FC = () => {
    const [data, setData] = React.useState<UserData[]>([]);
    const [input, setInput] = React.useState({
        title: '',
        description: '',
        status: '',
    });

    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const generateUniqueId = () => {
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        return newId;
    };

    const handleInputChange = (key: string, value: string) => {
        setInput((prevInput) => ({ ...prevInput, [key]: value }));
        setErrorMessage('');
    };

    const handleAddClick = () => {
        if (input.title.trim() === '' || input.description.trim() === '' || input.status.trim() === '') {
            setErrorMessage('Required fields.');
        } else {
            const newId = generateUniqueId();
            const newDate = new Date();
            const newData: UserData = { id: newId, createdDate: newDate, ...input };
            setData((prevData) => [...prevData, newData]);
            setInput({ title: '', description: '', status: '' });
        }
    };

    const handleDeleteClick = (id: number) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'current':
                return 'green';
            case 'passed':
                return 'blue';
            case 'hold-on':
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="flex-start" style={{ height: '100vh', marginTop: '40px' }}>
            <Grid item xs={8}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Title"
                                fullWidth
                                value={input.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                error={!!(errorMessage && input.title.trim() === '')}
                                helperText={errorMessage && input.title.trim() === '' && errorMessage}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Description"
                                fullWidth
                                value={input.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                error={!!(errorMessage && input.description.trim() === '')}
                                helperText={errorMessage && input.description.trim() === '' && errorMessage}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth error={!!(errorMessage && input.status.trim() === '')}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={input.status}
                                    onChange={(e) => handleInputChange('status', e.target.value as string)}
                                >
                                    <MenuItem value="current">Current</MenuItem>
                                    <MenuItem value="passed">Passed</MenuItem>
                                    <MenuItem value="hold-on">Hold-on</MenuItem>
                                </Select>
                                {errorMessage && input.status.trim() === '' && (
                                    <FormHelperText>{errorMessage}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={handleAddClick}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell style={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
                                        <TableCell>{row.createdDate.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(row.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ColumnPage;
