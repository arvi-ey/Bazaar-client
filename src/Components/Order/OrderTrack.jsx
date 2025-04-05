import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';

// enum: ['PLACED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED', "RETURNED"],


export default function OrderTrack({ orderStatus, orderDate, deliveryDate }) {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        {
            label: 'PLACED',
            description: `You've successfully placed your order! on ${orderDate}
            Your payment was successful and your items are being prepared for shipment. A confirmation email will be sent shortly.`,
        },
        {
            label: 'SHIPPED',
            description:
                'Your order has been shipped!Your items are on the way and will be delivered soon.Youll receive a tracking link via email to follow your shipment.',
        },
        {
            label: 'OUT',
            description: `Your order is out for delivery!Your package is on its way and will arrive today. Keep an eye out—it's almost there!`,
        },
        {
            label: "DELIVERED",
            description: `Your order has been delivered!We hope you're happy with your purchase. Thank you for shopping with us!`
        }
    ];

    useEffect(() => {
        console.log(orderStatus)
        const data = steps.findIndex(data => data.label == orderStatus)
        setActiveStep(data)

    }, [orderStatus])


    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical"
                sx={{
                    // Active step icon color
                    '& .MuiStepIcon-root.Mui-active': {
                        color: '#ec0d75',
                    },
                    // Active step label color
                    '& .MuiStepLabel-root.Mui-active .MuiStepLabel-label': {
                        color: '#ec0d75',
                        fontWeight: 'bold',
                    },
                    // Active connector line
                    '& .MuiStepConnector-root.Mui-active.MuiStepConnector-line': {
                        borderColor: '#ec0d75',
                    },
                }}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>

                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box >
    );
}
