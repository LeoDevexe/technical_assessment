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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  Divider,
  Chip,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import { circulationService } from '../services/vehicleApi';
import { CirculationCheckRequest, CirculationCheckResponse } from '../types';

export const CirculationCheckForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CirculationCheckRequest>();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState<CirculationCheckResponse | null>(null);

  const checkDateTime = watch('checkDateTime');

  const validateDateTime = (value: string) => {
    if (!value) return 'La fecha y hora es obligatoria';
    const selectedDate = new Date(value);
    const now = new Date();
    if (selectedDate < now) {
      return 'La fecha y hora no puede ser anterior a la fecha y hora actual';
    }
    return true;
  };

  const onSubmit = useCallback(async (data: CirculationCheckRequest) => {
    setLoading(true);
    try {
      // Validar que la fecha no sea anterior
      const selectedDate = new Date(data.checkDateTime);
      const now = new Date();
      if (selectedDate < now) {
        Swal.fire({
          icon: 'error',
          title: 'Error de Validación',
          text: 'La fecha y hora no puede ser anterior a la fecha y hora actual',
          confirmButtonColor: '#2563eb',
        });
        setLoading(false);
        return;
      }

      // Convertir la fecha y hora al formato requerido
      const checkDateTime = new Date(data.checkDateTime).toISOString().split('T')[0] + ' ' + 
                            new Date(data.checkDateTime).toTimeString().split(' ')[0];
      
      const responseData: CirculationCheckResponse = await circulationService.checkCirculation({
        ...data,
        checkDateTime
      });

      setResponse(responseData);
      setDialogOpen(true);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al validar circulación',
        confirmButtonColor: '#2563eb',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setResponse(null);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDayOfWeekInSpanish = (day: string) => {
    const days: Record<string, string> = {
      'MONDAY': 'Lunes',
      'TUESDAY': 'Martes',
      'WEDNESDAY': 'Miércoles',
      'THURSDAY': 'Jueves',
      'FRIDAY': 'Viernes',
      'SATURDAY': 'Sábado',
      'SUNDAY': 'Domingo'
    };
    return days[day] || day;
  };

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ mt: 2, mb: 4, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SearchIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Consultar Circulación
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Placa del Vehículo"
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

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha y Hora"
                    type="datetime-local"
                    {...register('checkDateTime', { 
                      required: 'La fecha y hora es obligatoria',
                      validate: validateDateTime
                    })}
                    error={!!errors.checkDateTime}
                    helperText={errors.checkDateTime?.message || 'Seleccione la fecha y hora a consultar'}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      min: new Date().toISOString().slice(0, 16),
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  startIcon={loading ? null : <SearchIcon />}
                  disabled={loading}
                  sx={{ 
                    px: 5, 
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {loading ? 'Validando...' : 'Consultar Circulación'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Dialog para mostrar resultado */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {response?.canCirculate ? (
                <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main', mr: 2 }} />
              ) : (
                <CancelIcon sx={{ fontSize: 32, color: 'error.main', mr: 2 }} />
              )}
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {response?.canCirculate ? 'Puedes Circular' : 'No Puedes Circular'}
              </Typography>
            </Box>
            <Chip 
              label={response?.canCirculate ? 'LIBRE' : 'RESTRINGIDO'} 
              color={response?.canCirculate ? 'success' : 'error'}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2.5, 
                backgroundColor: response?.canCirculate ? '#f0fdf4' : '#fef2f2',
                borderLeft: `4px solid ${response?.canCirculate ? '#10b981' : '#ef4444'}`,
                borderRadius: 2
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600, 
                  color: response?.canCirculate ? 'success.dark' : 'error.dark',
                  mb: 1
                }}
              >
                {response?.message}
              </Typography>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
            <DirectionsCarIcon sx={{ mr: 1, fontSize: 20 }} />
            Información del Vehículo
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Placa</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.vehicle.plate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Color</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.vehicle.color}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Modelo</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.vehicle.model}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Marca</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.vehicle.brand || 'N/A'}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1, fontSize: 20 }} />
            Detalles de la Consulta
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Fecha/Hora Consultada</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {response ? formatDateTime(response.checkDateTime) : ''}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Día de la Semana</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {response ? getDayOfWeekInSpanish(response.dayOfWeek) : ''}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Último Dígito</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.lastDigitPlate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Día de Restricción</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{response?.restrictionDay}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained"
            color="primary"
            sx={{ px: 3 }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
