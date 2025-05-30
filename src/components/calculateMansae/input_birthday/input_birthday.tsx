import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';

interface InputBirthdayProps {
  onAdd: (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: string
  ) => void;
}

const InputBirthday: React.FC<InputBirthdayProps> = ({ onAdd }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('09:50');
  const [gender, setGender] = useState('남자');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year && month && day) {
      onAdd(parseInt(year), parseInt(month), parseInt(day), time, gender);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='year'>년도</Label>
          <Input
            id='year'
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder='예: 1990'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='month'>월</Label>
          <Input
            id='month'
            type='number'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder='1-12'
            min='1'
            max='12'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='day'>일</Label>
          <Input
            id='day'
            type='number'
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder='1-31'
            min='1'
            max='31'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='time'>시간</Label>
          <Input
            id='time'
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
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
        <Button type='submit'>사주 보기</Button>
      </DialogFooter>
    </form>
  );
};

export default InputBirthday;
