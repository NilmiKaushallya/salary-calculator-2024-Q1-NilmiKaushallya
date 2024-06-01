import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    Divider,
    Grid,
    Card,
    CardContent,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';



const SalaryCalculator = () => {
    // Define state variables
    const [basicSalary, setBasicSalary] = useState(150000);
    const [earnings, setEarnings] = useState([{ type: 'Travel', value: 10000, epf: true }]);
    const [deductions, setDeductions] = useState([{ type: 'No Pay', value: 8000 }]);
    const [salaryBreakdown, setSalaryBreakdown] = useState({
        grossEarning: 0,
        grossDeduction: 0,
        employeeEPF: 0,
        APIT: 0,
        netSalary: 0,
        employerEPF: 0,
        employerETF: 0,
        CTC: 0,
    });

    // Function to handle adding a new earning row
    const handleAddEarning = () => {
        setEarnings([...earnings, { type: '', value: '', epf: false }]);
    };

    // Function to handle removing an earning row
    const handleRemoveEarning = (index) => {
        const newEarnings = earnings.filter((_, i) => i !== index);
        setEarnings(newEarnings);
    };

    // Function to handle changes in earning row inputs
    const handleEarningChange = (index, name, value) => {
        const newEarnings = earnings.map((earning, i) =>
            i === index ? { ...earning, [name]: value } : earning
        );
        setEarnings(newEarnings);
    };

    // Function to handle adding a new deduction row
    const handleAddDeduction = () => {
        setDeductions([...deductions, { type: '', value: '' }]);
    };

    // Function to handle removing a deduction row
    const handleRemoveDeduction = (index) => {
        const newDeductions = deductions.filter((_, i) => i !== index);
        setDeductions(newDeductions);
    };

    // Function to handle changes in deduction row inputs
    const handleDeductionChange = (index, name, value) => {
        const newDeductions = deductions.map((deduction, i) =>
            i === index ? { ...deduction, [name]: value } : deduction
        );
        setDeductions(newDeductions);
    };

    // Function to reset the form
    const handleReset = () => {
        setBasicSalary(150000);
        setEarnings([{ type: 'Travel', value: 10000, epf: true }]);
        setDeductions([{ type: 'No Pay', value: 8000 }]);
        setSalaryBreakdown({
            grossEarning: 0,
            grossDeduction: 0,
            employeeEPF: 0,
            APIT: 0,
            netSalary: 0,
            employerEPF: 0,
            employerETF: 0,
            CTC: 0,
        });
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Effect to calculate salary breakdown on every change
    React.useEffect(() => {
        const grossEarning = earnings.reduce((sum, earning) => sum + Number(earning.value), basicSalary);
        const grossDeduction = deductions.reduce((sum, deduction) => sum + Number(deduction.value), 0);
        const employeeEPF = earnings.reduce((sum, earning) => sum + (earning.epf ? Number(earning.value) * 0.08 : 0), basicSalary * 0.08);
        const APIT = (grossEarning - grossDeduction - employeeEPF) * 0.02;
        const netSalary = grossEarning - grossDeduction - employeeEPF - APIT;
        const employerEPF = basicSalary * 0.12;
        const employerETF = basicSalary * 0.03;
        const CTC = basicSalary + employerEPF + employerETF;

        setSalaryBreakdown({
            grossEarning,
            grossDeduction,
            employeeEPF,
            APIT,
            netSalary,
            employerEPF,
            employerETF,
            CTC,
        });
    }, [basicSalary, earnings, deductions]);

    return (
        <Box style={{ padding: '16px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card style={{ height: '100%', borderRadius: '8px', padding: '16px', backgroundColor: 'white' }}>
                        <CardContent>
                            <Box>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Calculate Your Salary
                                    </Typography>
                                    <Button variant="text" onClick={handleReset} startIcon={<RefreshIcon />}>
                                        Reset
                                    </Button>
                                </Stack>

                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Basic Salary
                                </Typography>
                                <TextField
                                    value={basicSalary}
                                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                                    fullWidth
                                    margin="normal"
                                    style={{ width: '100%', marginBottom: '16px' }}
                                />

                                <Stack>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Earnings
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        Allowance, Fixed Allowance, Bonus, and etc.
                                    </Typography>
                                    {earnings.map((earning, index) => (
                                        <Box key={index} display="flex" alignItems="center" mb={1}>
                                            <TextField
                                                label="Pay Details (Title)"
                                                name="type"
                                                value={earning.type}
                                                onChange={(e) => handleEarningChange(index, 'type', e.target.value)}
                                                margin="normal"
                                                style={{ marginRight: '8px' }}
                                            />
                                            <TextField
                                                label="Amount"
                                                name="value"
                                                value={earning.value}
                                                onChange={(e) => handleEarningChange(index, 'value', e.target.value)}
                                                margin="normal"
                                                style={{ marginRight: '8px' }}
                                            />
                                            <IconButton onClick={() => handleRemoveEarning(index)} color="default">
                                                <CancelIcon />
                                            </IconButton>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={earning.epf}
                                                        onChange={(e) => handleEarningChange(index, 'epf', e.target.checked)}
                                                        name="epf"
                                                    />
                                                }
                                                label="EPF/ETF"
                                                style={{ marginRight: '8px' }}
                                            />
                                        </Box>
                                    ))}
                                    <Grid item xs={6} md={6}>
                                        <Button
                                            variant="text"
                                            onClick={handleAddEarning}
                                            style={{ marginTop: '8px', textTransform: 'none' }}
                                        >
                                            + AddNew Allowance
                                        </Button>
                                    </Grid>
                                </Stack>

                                <Divider style={{ marginY: '16px' }} />

                                <Stack style={{ marginTop: '24px' }}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Deductions
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        Salary Advances, Loan Deductions, and all.
                                    </Typography>
                                    {deductions.map((deduction, index) => (
                                        <Box key={index} display="flex" alignItems="center" mb={1}>
                                            <TextField
                                                label="Deduction Type"
                                                name="type"
                                                value={deduction.type}
                                                onChange={(e) => handleDeductionChange(index, 'type', e.target.value)}
                                                margin="normal"
                                                style={{ marginRight: '8px' }}
                                            />
                                            <TextField
                                                label="Deduction Value"
                                                name="value"
                                                value={deduction.value}
                                                onChange={(e) => handleDeductionChange(index, 'value', e.target.value)}
                                                margin="normal"
                                                style={{ marginRight: '8px' }}
                                            />
                                            <IconButton onClick={() => handleRemoveDeduction(index)} color="default">
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Grid item xs={6} md={6}>
                                        <Button
                                            variant="text"
                                            onClick={handleAddDeduction}
                                            style={{ marginTop: '8px', textTransform: 'none' }}
                                        >
                                            + Add New Deduction
                                        </Button>
                                    </Grid>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card style={{ height: '100%', borderRadius: '8px', padding: '16px', backgroundColor: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Your Salary
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" color={'grey'} fontWeight="bold">Items</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right" color={'grey'} fontWeight="bold">Amount</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Basic Salary:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">{basicSalary.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Gross Earning:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">{salaryBreakdown.grossEarning.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Gross Deduction:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">- {salaryBreakdown.grossDeduction.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Employee EPF (8%):</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">- {salaryBreakdown.employeeEPF.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">APIT:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">- {salaryBreakdown.APIT.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    width: isMobile ? '100%' : 470,
                                    mt: 2,
                                    mb: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: 'grey.100',
                                }}
                            >
                                <Typography variant="h6" align="center">
                                    Net Salary (Take Home): {salaryBreakdown.netSalary.toFixed(2)}
                                </Typography>
                            </Box>
                            <Grid item xs={8}>
                                <Typography md={5} variant="body1" color={'grey'} fontWeight="bold">Contribution From the Employer</Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6} mt={2}>
                                    <Typography variant="body1">Employer EPF (12%):</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">{salaryBreakdown.employerEPF.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Employer ETF (3%):</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">{salaryBreakdown.employerETF.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">CTC (Cost to Company):</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" align="right">{salaryBreakdown.CTC.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalaryCalculator;

