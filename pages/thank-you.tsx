import { Typography, Box } from '@mui/material';

export default function ThankYouPage() {
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Thank You for Your Purchase!
      </Typography>
      <Typography variant="subtitle1">Your order has been successfully placed.</Typography>
    </Box>
  );
}
