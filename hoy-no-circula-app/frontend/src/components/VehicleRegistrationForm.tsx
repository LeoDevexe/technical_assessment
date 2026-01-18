import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
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

export const VehicleRegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<VehicleRequestDTO>();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data: VehicleRequestDTO) => {
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
      
      reset();
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar el vehículo',
      });
    } finally {
      setLoading(false);
    }
  }, [reset]);

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
          
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Placa"
                  placeholder="ABC-1234"
                  {...register('plate', { 
                    required: 'La placa es obligatoria',
                    pattern: {
                      value: /^[A-Z]{3}-?\d{3,4}$/i,
                      message: 'Formato de placa inválido (ej: ABC-1234)'
                    }
                  })}
                  error={!!errors.plate}
                  helperText={errors.plate?.message}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Color"
                  placeholder="Rojo"
                  {...register('color', { required: 'El color es obligatorio' })}
                  error={!!errors.color}
                  helperText={errors.color?.message}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaletteIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Modelo"
                  placeholder="Sedan"
                  {...register('model', { required: 'El modelo es obligatorio' })}
                  error={!!errors.model}
                  helperText={errors.model?.message}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BuildIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chasis"
                  placeholder="CH1234567890"
                  {...register('chassis', { required: 'El chasis es obligatorio' })}
                  error={!!errors.chassis}
                  helperText={errors.chassis?.message}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marca"
                  placeholder="Toyota"
                  {...register('brand')}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Año"
                  type="number"
                  placeholder="2023"
                  {...register('year', { 
                    valueAsNumber: true,
                    validate: (value) => !value || (value >= 1900 && value <= new Date().getFullYear() + 1) || 'Año inválido'
                  })}
                  error={!!errors.year}
                  helperText={errors.year?.message}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tipo de Vehículo"
                  placeholder="Particular, Comercial, etc."
                  {...register('type')}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon color="action" />
                      </InputAdornment>
                    ),
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
                startIcon={loading ? null : <CheckCircleIcon />}
                disabled={loading}
                sx={{ 
                  px: 5, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {loading ? 'Registrando...' : 'Registrar Vehículo'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
