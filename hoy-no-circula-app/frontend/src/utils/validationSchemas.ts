import * as Yup from 'yup';

// Expresiones regulares para validaciones
const PLATE_PATTERN = /^[A-Z]{3}-?\d{3,4}$/i; // ABC-1234 o ABC1234
const CHASSIS_PATTERN = /^[A-Z0-9]{17}$/i; // VIN - 17 caracteres alfanuméricos
const COLOR_PATTERN = /^[a-zA-Z\s]+$/; // Solo letras y espacios
const YEAR_PATTERN = /^\d{4}$/; // 4 dígitos

// Esquema de validación para Registro de Vehículos
export const vehicleValidationSchema = Yup.object().shape({
  plate: Yup.string()
    .required('La placa es obligatoria')
    .matches(PLATE_PATTERN, 'Formato de placa inválido (ej: ABC-1234 o ABC1234)')
    .test('valid-length', 'La placa debe ser ABC-1234 o ABC1234', (value) => {
      if (!value) return false;
      const cleaned = value.replace('-', '');
      return cleaned.length === 7;
    })
    .transform((value) => value?.toUpperCase().replace('-', '') || ''),
  
  color: Yup.string()
    .required('El color es obligatorio')
    .matches(COLOR_PATTERN, 'El color solo puede contener letras')
    .min(2, 'El color debe tener al menos 2 caracteres')
    .max(50, 'El color máximo 50 caracteres'),
  
  model: Yup.string()
    .required('El modelo es obligatorio')
    .min(1, 'El modelo es obligatorio')
    .max(100, 'El modelo máximo 100 caracteres'),
  
  chassis: Yup.string()
    .required('El chasis (VIN) es obligatorio')
    .length(17, 'El chasis debe contener exactamente 17 caracteres')
    .matches(CHASSIS_PATTERN, 'El chasis solo puede contener letras y números')
    .transform((value) => value?.toUpperCase()),
  
  brand: Yup.string()
    .optional()
    .max(50, 'La marca máximo 50 caracteres'),
  
  year: Yup.string()
    .optional()
    .length(4, 'El año debe tener exactamente 4 dígitos')
    .matches(YEAR_PATTERN, 'El año debe ser un número de 4 dígitos')
    .test('valid-year', 'El año debe estar entre 1900 y el año actual', (value) => {
      if (!value) return true;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }),
});

// Esquema de validación para Consulta de Circulación
export const circulationValidationSchema = Yup.object().shape({
  plate: Yup.string()
    .required('La placa es obligatoria')
    .matches(PLATE_PATTERN, 'Formato de placa inválido (ej: ABC-1234 o ABC1234)')
    .test('valid-length', 'La placa debe ser ABC-1234 o ABC1234', (value) => {
      if (!value) return false;
      const cleaned = value.replace('-', '');
      return cleaned.length === 7;
    })
    .transform((value) => value?.toUpperCase().replace('-', '') || ''),
  
  checkDateTime: Yup.string()
    .required('La fecha y hora es obligatoria')
    .test('valid-datetime', 'La fecha y hora debe ser válida', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      return !isNaN(selectedDate.getTime());
    })
    .test('not-future', 'No puedes consultar fechas futuras, solo pasadas o la actual', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const now = new Date();
      return selectedDate <= now;
    })
    .test('reasonable-date', 'La fecha debe estar dentro de los últimos 30 días', (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const now = new Date();
      
      const minDate = new Date(now);
      minDate.setDate(minDate.getDate() - 30);
      
      return selectedDate >= minDate;
    }),
});
