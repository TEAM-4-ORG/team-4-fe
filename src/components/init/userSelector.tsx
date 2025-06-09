import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon, Trash2Icon } from 'lucide-react';

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
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDeleteUser } from '@/services/user';
import { deleteUserInfoFromLocalStorage } from '@/utils/localStorage';
import useUserIdCheck from '@/hooks/useUserIdCheck';

export function UserSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const { userInfoList, reloadUserInfoList } = useUserIdCheck();

  const { mutateAsync: deleteUser } = useDeleteUser({
    onSuccess: (_, userId) => {
      deleteUserInfoFromLocalStorage(userId);
      reloadUserInfoList();
    },
    onError: () => {
      alert('삭제에 실패했습니다.');
    },
  });

  if (!userInfoList || userInfoList.length === 0) return null;

  const selected = userInfoList.find((user) => `${user.userId}` === value);
  const selectedLabel = selected
    ? `${selected.info.birthYear}년-${selected.info.birthMonth}월-${selected.info.birthDay}일-${selected.info.birthTime} / ${selected.info.gender}`
    : '사주 기록 선택';

  return (
    <div className='flex w-full flex-col items-center justify-center gap-5 rounded-2xl bg-white shadow-xl'>
      <div className='text-center whitespace-pre'>
        <p>{`이전에 서비스를 이용했던 경험이 있어요.`}</p>
        <p>{`아래 사주를 바탕으로도 질문할 수 있어요.`}</p>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[250px] justify-between'
          >
            {selectedLabel}
            <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[250px] p-0'>
          <Command>
            <CommandInput placeholder='사주 기록 검색...' />
            <CommandList>
              <CommandEmpty>사주 기록이 없습니다.</CommandEmpty>
              <CommandGroup>
                {userInfoList.map((user) => (
                  <CommandItem
                    key={user.userId}
                    value={`${user.userId}`}
                    className='flex items-center justify-between'
                  >
                    <div
                      className='flex flex-1 cursor-pointer items-center'
                      onClick={() => {
                        setValue(`${user.userId}`);
                        setOpen(false);
                        router.replace(`/${user.userId}/saju`);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === `${user.userId}`
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      <span className='text-sm'>
                        {`${user.info.birthYear}년-${user.info.birthMonth}월-${user.info.birthDay}일-${user.info.birthTime} / ${user.info.gender}`}
                      </span>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('정말 이 유저를 삭제하시겠습니까?')) {
                          deleteUser(user.userId);
                        }
                      }}
                    >
                      <Trash2Icon className='h-4 w-4 text-red-500' />
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
