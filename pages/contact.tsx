import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  SupportAgent as SupportAgentIcon,
  Public as PublicIcon,
} from "@mui/icons-material";
import Link from "next/link";  // Import Link for routing
import { useTheme } from "@mui/material/styles";


export default function ContactPage() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const theme = useTheme();
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ subject: "", message: "" });
    setMessage("Thanks for contacting us!");
  };

  const isFormValid = Object.values(form).every((field) => field.trim() !== "");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/YOUR_TAWKTO_ID/1hxyzabc";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        background: theme.palette.mode === "light"
          ? "linear-gradient(to bottom, #e0f7fa, #ffffff)"
          : "linear-gradient(to bottom, #121212, #1e1e1e)",
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, md: 6 },
        color: theme.palette.text.primary,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#ffffffee"
              : "#1c1c1cee",
          backdropFilter: "blur(6px)",
          maxWidth: 1000,
          mx: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Contact Firemaster
        </Typography>

        <Typography variant="body1" mb={3} sx={{ fontSize: "1.1rem" }}>
          We would love to hear from you! You can contact us by phone, email, or leave a message via the form.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <List>
          <ListItem>
            <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary={
                <Link href="mailto:support@firemaster.com" color="primary">
                  support@firemaster.com
                </Link>
              }
              secondary="Customer Service Email"
            />
          </ListItem>
          <ListItem>
            <PhoneIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary={
                <Link href="tel:+972-3-1234567" color="primary">
                  +972-3-1234567
                </Link>
              }
              secondary="Main phone"
            />
          </ListItem>
          <ListItem>
            <SupportAgentIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary={
                <Link href="mailto:tech@firemaster.com" color="primary">
                  tech@firemaster.com
                </Link>
              }
              secondary="Technical Support"
            />
          </ListItem>
          <ListItem>
            <LocationOnIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary={
                <Link
                  href="https://www.google.com/maps?q=Tehran,+Iran"
                  color="primary"
                >
                  Tehran, Iran
                </Link>
              }
              secondary="Main branch location"
            />
          </ListItem>
          <ListItem>
            <AccessTimeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary="Hours of operation"
              secondary="Sun–Thu: 09:00–17:00 | Fri: 09:00–12:00 | Sat: Closed"
            />
          </ListItem>
          <ListItem>
            <PublicIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <ListItemText
              primary={
                <Link href="https://www.instagram.com/Firemaster" color="primary">
                  @Firemaster
                </Link>
              }
              secondary="Follow us on social media"
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Send a message directly
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              value={form.subject}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
              sx={{ backgroundColor: theme.palette.background.default }}
            />
            <TextField
              required
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              value={form.message}
              onChange={handleChange}
              InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
              sx={{ backgroundColor: theme.palette.background.default }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormValid}
              sx={{
                width: "fit-content",
                alignSelf: "flex-start",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                opacity: !isFormValid ? 0.5 : 1,
                cursor: !isFormValid ? "not-allowed" : "pointer",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Send a message
            </Button>

            {message && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.success.main, mt: 2, fontWeight: "bold" }}
              >
                {message}
              </Typography>
            )}
          </Stack>
        </Box>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Our location on the map
        </Typography>

        <Box
          sx={{
            mt: 2,
            width: "100%",
            height: { xs: 300, md: 400 },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.916948456512!2d51.38900321525844!3d35.689197480193446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0172fe9c12c1%3A0x2b419a5fdd6f53f4!2sTehran%2C%20Iran!5e0!3m2!1sen!2sil!4v1716046423793!5m2!1sen!2sil"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </Box>
      </Paper>
    </Box>
  );
}
