import useUserStore from '../service/useUserStore';
import { FieldValues, useForm } from 'react-hook-form';
import { Box, Stack, FormControl, FormLabel, Input, Button, Select, Text } from '@chakra-ui/react';
import useSupervisors from '../hooks/useSupervisors';
import usePtoRequest from '../hooks/usePtoRequest';
import { useEffect, useState } from 'react';
import HolidayService from '../service/HolidayService';

interface FormData {
  ptoStart: string;
  ptoEnd: string;
  acceptorId: number;
  daysTotal: number;
}

interface Props {
  isUserDataFetching: boolean;
}

export const PtoRequestForm = ({ isUserDataFetching }: Props) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateInvalid, setDateInvalid] = useState(false);
  const { submit, isSubmitting } = usePtoRequest();
  const { appUser } = useUserStore();
  const { data, isFetching } = useSupervisors(appUser!.userId);

  const datesValid = startDate && endDate && !dateInvalid;

  datesValid && HolidayService.calculateBusinessDays(new Date(startDate), new Date(endDate))
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid: formValid },
  } = useForm<FormData>();

  useEffect(() => {
    validateDates();
  }, [startDate, endDate]);

  const onSubmit = (dataFields: FieldValues) => {
    submit(dataFields, reset);
  };

  const validateDates = () => {
    setDateInvalid(false);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }
    if (start.getTime() > end.getTime()) {
      setDateInvalid(true);
    }
  };

  return (
    <>
      <Box maxW={'60%'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Dzień rozpoczęcia urlopu:</FormLabel>
            <Input
              type='date'
              {...register('ptoStart', { required: true, onChange: e => setStartDate(e.target.value) })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ostatni dzień urlopu:</FormLabel>
            <Input
              type='date'
              {...register('ptoEnd', {
                required: true,
                onChange: e => {
                  setEndDate(e.target.value);
                },
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Przełożony:</FormLabel>
            <Select
              isDisabled={isFetching}
              placeholder={isFetching ? 'Pobieram dane' : 'Wybierz z listy'}
              {...register('acceptorId', { valueAsNumber: true, required: true })}
            >
              {data &&
                data.map(supervisor => (
                  <option
                    key={supervisor.id}
                    value={supervisor.id}
                  >{`${supervisor.firstName} ${supervisor.lastName}`}</option>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Razem dni roboczych:</FormLabel>
            <Input type='number' {...register('daysTotal', { valueAsNumber: true, required: true })} />
          </FormControl>
          <Stack spacing={10} p={2}>
            <Button
              isDisabled={!formValid || dateInvalid || isUserDataFetching}
              isLoading={isSubmitting}
              type='submit'
              w={'100%'}
            >
              Wyślij
            </Button>
          </Stack>
        </form>
      </Box>
      {datesValid && (
        <Box>
          <Text>{`Urlop pomiędzy ${startDate} oraz ${endDate}`}</Text>
          <Text>{`Obejmuje ${HolidayService.calculateDays(new Date(startDate), new Date(endDate))} dni kalendarzowe`}</Text>
          <Text>{`W tym ${HolidayService.calculateBusinessDays(new Date(startDate), new Date(endDate))} dni robocze`}</Text>
        </Box>
      )}
    </>
  );
};
