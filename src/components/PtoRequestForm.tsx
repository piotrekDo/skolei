import useUserStore from '../service/useUserStore';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import useSupervisors from '../hooks/useSupervisors';
import usePtoRequest from '../hooks/usePtoRequest';



interface FormData {
  ptoStart: string;
  ptoEnd: string;
  acceptorId: number;
  daysTotal: number;
}

export const PtoRequestForm = () => {
  const {submit, isSubmitting} = usePtoRequest();
  const { appUser } = useUserStore();
  const { data, isFetching } = useSupervisors(appUser!.userId);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const onSubmit = (dataFields: FieldValues) => {
    submit(dataFields, reset)
  };

  return (
    <Box maxW={'60%'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Dzień rozpoczęcia urlopu:</FormLabel>
          <Input type='date' {...register('ptoStart', {required: true})} />
        </FormControl>
        <FormControl>
          <FormLabel>Ostatni dzień urlopu:</FormLabel>
          <Input type='date' {...register('ptoEnd', {required: true})} />
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
          <Button isLoading={isSubmitting} type='submit' w={'100%'}>
            Wyślij
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
