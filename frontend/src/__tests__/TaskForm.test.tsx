import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('renders title and description fields', () => {
    render(<TaskForm onAddTask={() => {}} />);
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Description/i)).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', () => {
    render(<TaskForm onAddTask={() => {}} />);
    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
  });

  it('calls onAddTask with valid data and clears form', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm onAddTask={mockAddTask} />);

    fireEvent.change(screen.getByLabelText(/Task Title/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText(/Task Description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /Add Task/i }));

    expect(mockAddTask).toHaveBeenCalledWith('Test Task', 'Test Description');
    expect(screen.getByLabelText(/Task Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Task Description/i)).toHaveValue('');
  });
});
