import { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import { 
  Button, 
  TextField, 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Container,
  Grid,
  InputAdornment,
  Divider
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaletteIcon from '@mui/icons-material/Palette';
import BuildIcon from '@mui/icons-material/Build';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';
import { vehicleService } from '../services/vehicleApi';
import { VehicleRequestDTO } from '../types';
import { vehicleValidationSchema } from '../utils/validationSchemas';

const initialValues: VehicleRequestDTO = {
  plate: '',
  color: '',
  model: '',
  chassis: '',
  brand: '',
  year: '',
  type: ''
};

export const VehicleRegistrationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);


  const onSubmit = useCallback(async (data: VehicleRequestDTO, { resetForm }: any) => {
    setLoading(true);
    try {
      const response = await vehicleService.registerVehicle(data);
      
      Swal.fire({
        icon: 'success',
        title: 'Vehículo Registrado Exitosamente',
        html: `
          <div style="text-align: left; font-size: 14px; padding: 10px;">
            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #2563eb;">
              <p style="margin: 5px 0;"><strong>Placa:</strong> ${response.plate}</p>
              <p style="margin: 5px 0;"><strong>Color:</strong> ${response.color}</p>
              <p style="margin: 5px 0;"><strong>Modelo:</strong> ${response.model}</p>
              <p style="margin: 5px 0;"><strong>Chasis:</strong> ${response.chassis}</p>
              ${response.brand ? `<p style="margin: 5px 0;"><strong>Marca:</strong> ${response.brand}</p>` : ''}
              ${response.year ? `<p style="margin: 5px 0;"><strong>Año:</strong> ${response.year}</p>` : ''}
            </div>
          </div>
        `,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2563eb',
      });
      
      resetForm();
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar el vehículo',
      });
    } finally {
      setLoading(false);
    }
  }, []);


  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 2, mb: 4, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DirectionsCarIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Registrar Nuevo Vehículo
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Formik
            initialValues={initialValues}
            validationSchema={vehicleValidationSchema}
            onSubmit={onSubmit}
            validateOnChange
            validateOnBlur
          >
            {({ values, errors, touched, isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="plate"
                      label="Placa"
                      placeholder="ABC-1234"
                      value={values.plate}
                      error={touched.plate && !!errors.plate}
                      helperText={touched.plate && errors.plate || 'Formato: ABC-1234'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ConfirmationNumberIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 8,
                        style: { textTransform: 'uppercase' },
                      }}
                      onChange={(e) => setFieldValue('plate', e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="color"
                      label="Color"
                      placeholder="Rojo"
                      value={values.color}
                      error={touched.color && !!errors.color}
                      helperText={touched.color && errors.color || 'Solo letras (máx 50 caracteres)'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PaletteIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 50,
                        pattern: '[a-zA-Z\\s]*',
                      }}
                      onChange={(e) => setFieldValue('color', e.target.value.replace(/[^a-zA-Z\\s]/g, ''))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="model"
                      label="Modelo"
                      placeholder="Sedan"
                      value={values.model}
                      error={touched.model && !!errors.model}
                      helperText={touched.model && errors.model || 'Máximo 100 caracteres'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BuildIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 100,
                      }}
                      onChange={(e) => setFieldValue('model', e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="chassis"
                      label="Chasis (VIN)"
                      placeholder="Ejm: 1HGBH41JXMN109186"
                      value={values.chassis}
                      error={touched.chassis && !!errors.chassis}
                      helperText={touched.chassis && errors.chassis || '17 caracteres alfanuméricos'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ConfirmationNumberIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 17,
                        style: { textTransform: 'uppercase' },
                      }}
                      onChange={(e) => setFieldValue('chassis', e.target.value.toUpperCase())}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="brand"
                      label="Marca"
                      placeholder="Toyota"
                      value={values.brand}
                      error={touched.brand && !!errors.brand}
                      helperText={touched.brand && errors.brand || 'Opcional - Máximo 50 caracteres'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 50,
                      }}
                      onChange={(e) => setFieldValue('brand', e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="year"
                      label="Año"
                      placeholder="2023"
                      type="tel"
                      value={values.year}
                      error={touched.year && !!errors.year}
                      helperText={touched.year && errors.year || 'Opcional - 4 dígitos'}
                      disabled={loading || isSubmitting}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 4,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFieldValue('year', value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    startIcon={loading || isSubmitting ? null : <CheckCircleIcon />}
                    disabled={loading || isSubmitting || !isValid}
                    sx={{ 
                      px: 5, 
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    {loading || isSubmitting ? 'Registrando...' : 'Registrar Vehículo'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};
