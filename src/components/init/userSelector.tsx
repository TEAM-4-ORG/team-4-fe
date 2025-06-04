import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { localStorageUserInfo } from '@/types/common';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function UserSelector({
  userList,
}: {
  userList: localStorageUserInfo[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  if (!userList) return;

  const selected = userList.find((user) => `${user.userId}` === value);
  const selectedLabel = selected
    ? `${selected?.info.birthYear}년-${selected?.info.birthMonth}월-${selected?.info.birthDay}일-${selected?.info.birthTime} / ${selected?.info.gender}`
    : '사주 기록 선택';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selectedLabel}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>사주 기록이 없습니다.</CommandEmpty>
            <CommandGroup>
              {userList.map((user) => (
                <CommandItem
                  key={user.userId}
                  value={`${user.userId}`}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    router.replace(`/${user?.userId}/saju`);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === `${user.userId}` ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {`${user.info.birthYear}년-${user.info.birthMonth}월-${user.info.birthDay}일-${user.info.birthTime} / ${user.info.gender}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
