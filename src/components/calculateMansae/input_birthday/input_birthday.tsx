import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { GenderType } from '@/types/saju';

interface InputBirthdayProps {
  onAdd: (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: GenderType
  ) => void;
}

const birthdaySchema = z
  .object({
    year: z
      .string()
      .min(4, '년도는 4자리여야 합니다')
      .refine((val) => +val >= 1900 && +val <= new Date().getFullYear(), {
        message: '올바른 년도를 입력해주세요',
      }),
    month: z
      .string()
      .min(1, '월을 입력해주세요')
      .refine((val) => +val >= 1 && +val <= 12, {
        message: '1부터 12 사이의 월을 입력해주세요',
      }),
    day: z
      .string()
      .min(1, '일을 입력해주세요')
      .refine((val) => +val >= 1 && +val <= 31, {
        message: '1부터 31 사이의 일을 입력해주세요',
      }),
    time: z.string().refine(
      (val) => {
        const selected = new Date(`2000-01-01T${val}`);
        const now = new Date();
        return selected <= now;
      },
      { message: '미래 시간은 선택할 수 없습니다' }
    ),
  })
  .required();

export default function InputBirthday({ onAdd }: InputBirthdayProps) {
  const form = useForm({
    resolver: zodResolver(birthdaySchema),
    defaultValues: {
      year: '',
      month: '',
      day: '',
      time: '17:00',
    },
  });

  const [gender, setGender] = React.useState<GenderType>('남자');

  const onSubmit = (data: z.infer<typeof birthdaySchema>) => {
    const { year, month, day, time } = data;
    onAdd(parseInt(year), parseInt(month) - 1, parseInt(day), time, gender);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='year'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='year'>년도</Label>
                <FormControl>
                  <Input
                    id='year'
                    type='number'
                    placeholder='예: 1990'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='month'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='month'>월</Label>
                <FormControl>
                  <Input
                    id='month'
                    type='number'
                    placeholder='1-12'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='day'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='day'>일</Label>
                <FormControl>
                  <Input id='day' type='number' placeholder='1-31' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='time'>시간</Label>
                <FormControl>
                  <Input id='time' type='time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-2'>
          <Label>성별</Label>
          <div className='flex gap-4'>
            <Button
              type='button'
              variant={gender === '남자' ? 'default' : 'outline'}
              onClick={() => setGender('남자')}
            >
              남자
            </Button>
            <Button
              type='button'
              variant={gender === '여자' ? 'default' : 'outline'}
              onClick={() => setGender('여자')}
            >
              여자
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button type='submit'>사주 입력하기</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
