import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputBirthday from './input_birthday';
import '@testing-library/jest-dom';

describe('InputBirthday Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    render(<InputBirthday onAdd={mockOnAdd} />);
  });

  it('should render all input fields and buttons', () => {
    expect(screen.getByLabelText('년도')).toBeInTheDocument();
    expect(screen.getByLabelText('월')).toBeInTheDocument();
    expect(screen.getByLabelText('일')).toBeInTheDocument();
    expect(screen.getByLabelText('시간')).toBeInTheDocument();
    expect(screen.getByText('남자')).toBeInTheDocument();
    expect(screen.getByText('여자')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /사주 입력하기/i })
    ).toBeInTheDocument();
  });

  it('should show validation error when fields are empty', async () => {
    fireEvent.click(screen.getByRole('button', { name: /사주 입력하기/i }));
    await waitFor(() => {
      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  it('should call onAdd with valid data', async () => {
    fireEvent.change(screen.getByLabelText('년도'), {
      target: { value: '2000' },
    });
    fireEvent.change(screen.getByLabelText('월'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('일'), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText('시간'), {
      target: { value: '09:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /사주 입력하기/i }));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(2000, 4, 15, '09:00', '남자'); // month - 1
    });
  });

  it('should switch gender when clicked', async () => {
    const femaleBtn = screen.getByText('여자');
    fireEvent.click(femaleBtn);

    fireEvent.change(screen.getByLabelText('년도'), {
      target: { value: '1999' },
    });
    fireEvent.change(screen.getByLabelText('월'), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText('일'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('시간'), {
      target: { value: '08:30' },
    });

    fireEvent.click(screen.getByRole('button', { name: /사주 입력하기/i }));
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(1999, 11, 1, '08:30', '여자');
    });
  });

  it('blocks future dates', async () => {
    fireEvent.change(screen.getByLabelText('년도'), {
      target: { value: '3000' },
    });
    fireEvent.change(screen.getByLabelText('월'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText('일'), {
      target: { value: '32' },
    });
    fireEvent.change(screen.getByLabelText('시간'), {
      target: { value: '12:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /사주 입력하기/i }));

    await waitFor(() => {
      expect(
        screen.getByText('올바른 년도를 입력해주세요')
      ).toBeInTheDocument();
    });
  });
  it('blocks future dates', async () => {
    fireEvent.change(screen.getByLabelText('년도'), {
      target: { value: '2000' },
    });
    fireEvent.change(screen.getByLabelText('월'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText('일'), {
      target: { value: '32' },
    });
    fireEvent.change(screen.getByLabelText('시간'), {
      target: { value: '12:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /사주 입력하기/i }));

    await waitFor(() => {
      expect(
        screen.getByText('1부터 31 사이의 일을 입력해주세요')
      ).toBeInTheDocument();
    });
  });
});
