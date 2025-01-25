import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const GUMROAD_PRODUCT_URL = 'https://gum.co/virallume';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ open, onClose }) => {
  const handleUpgrade = () => {
    window.open(GUMROAD_PRODUCT_URL, '_blank');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="paywall-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="paywall-modal-title" variant="h5" component="h2" gutterBottom>
          Upgrade to ViralLume Pro
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Unlock unlimited post generation and premium features:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Unlimited post generation" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Advanced AI customization" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Priority trend updates" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Style memory & analytics" />
          </ListItem>
        </List>

        <Typography variant="h6" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
          $19 Lifetime Access
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} color="inherit">
            Maybe Later
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpgrade}
          >
            Upgrade Now
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
