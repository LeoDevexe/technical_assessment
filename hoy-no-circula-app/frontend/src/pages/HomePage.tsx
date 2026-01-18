import { useState } from 'react';
import { Container, Tabs, Tab, Box, AppBar, Toolbar, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import { VehicleRegistrationForm } from '../components/VehicleRegistrationForm';
import { CirculationCheckForm } from '../components/CirculationCheckForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const HomePage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <DirectionsCarIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Hoy No Circula - Sistema de Validación
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3, mb: 2 }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="opciones"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minHeight: 64,
              }
            }}
          >
            <Tab 
              icon={<DirectionsCarIcon />} 
              iconPosition="start"
              label="Registrar Vehículo" 
              {...a11yProps(0)} 
            />
            <Tab 
              icon={<SearchIcon />} 
              iconPosition="start"
              label="Consultar Circulación" 
              {...a11yProps(1)} 
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <VehicleRegistrationForm />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <CirculationCheckForm />
        </TabPanel>
      </Container>
    </>
  );
};
