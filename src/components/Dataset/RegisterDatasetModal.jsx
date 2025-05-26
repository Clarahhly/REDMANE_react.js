import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';

export default function RegisterDatasetModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    site: '',
    location: '',
    raw_files: '',
    processed_files: '',
    summary_files: '',
    readme_files: ''
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/datasets/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        alert('Failed to register dataset');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Register New Dataset</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Title *"
              value={formData.title}
              onChange={handleChange('title')}
            />
            <TextField
              fullWidth
              required
              label="Abstract *"
              multiline
              minRows={4}
              value={formData.abstract}
              onChange={handleChange('abstract')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              required
              label="Site *"
              value={formData.site}
              onChange={handleChange('site')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={handleChange('location')}
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Raw files"
              placeholder="*.fastq, *.fasta"
              value={formData.raw_files}
              onChange={handleChange('raw_files')}
            />
            <TextField
              fullWidth
              label="Processed files"
              placeholder="*.cram, *.bam"
              value={formData.processed_files}
              onChange={handleChange('processed_files')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Summary files"
              placeholder="*.vcf, *.maf"
              value={formData.summary_files}
              onChange={handleChange('summary_files')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="README files"
              placeholder="README.md"
              value={formData.readme_files}
              onChange={handleChange('readme_files')}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#FFF176',
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#fce96a' }
          }}
        >
          Register New
        </Button>
      </DialogActions>
    </Dialog>
  );
}
