'use client';
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function ContactPage() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        minHeight: '100vh',
        py: 6,
        px: { xs: 2, md: 6 },
        color: '#0D47A1',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: '#ffffffcc', // white with a bit of transparency
          backdropFilter: 'blur(6px)',
          color: '#0D47A1',
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={3}>
          📞 Contact Us
        </Typography>

        <Typography variant="body1" mb={3}>
          Have questions, feedback, or need assistance? Our support team is here to help you.
          Whether you're a new customer, a returning user, or just want to say hello — we'd love to hear from you!
        </Typography>

        <List sx={{ mb: 3 }}>
          <ListItem>
            <ListItemText
              primary="📧 Email Support"
              secondary="support@firemaster.com — Send us a message and we’ll get back to you within 24 hours."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="📞 Phone Support"
              secondary="+1 234 567 8900 — Available Sunday to Thursday, 9:00 AM – 5:00 PM."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="📍 Office Location"
              secondary="123 Firemaster Avenue, Tel Aviv, Israel"
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🕒 Working Hours"
              secondary={
                <ul style={{ paddingLeft: 16 }}>
                  <li>Sunday – Thursday: 9:00 AM to 5:00 PM</li>
                  <li>Friday: 9:00 AM to 12:00 PM</li>
                  <li>Saturday: Closed</li>
                </ul>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🌐 Social Media"
              secondary="Follow us on Instagram, Facebook, and Twitter to stay updated with news and offers."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="💬 Live Chat"
              secondary="Our live chat is available on the bottom right corner of the screen during working hours."
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Looking for technical support?
        </Typography>
        <Typography>
          If you're experiencing issues with our products or website, visit our{' '}
          <a href="/help-center" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Help Center
          </a>{' '}
          or contact our technical team directly at{' '}
          <strong>tech@firemaster.com</strong>.
        </Typography>
      </Paper>
    </Box>
  );
}
