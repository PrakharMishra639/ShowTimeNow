declare module 'react-horizontal-datepicker' {
    const DatePicker: React.ComponentType<{
      getSelectedDay: (date: Date) => void;
      endDate?: number;
      selectDate?: string;
      labelFormat?: string;
      color?: string;
    }>;
    export default DatePicker;
  }
  