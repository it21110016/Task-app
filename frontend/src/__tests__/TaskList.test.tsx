import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Desc 1', is_completed: false },
  { id: 2, title: 'Task 2', description: 'Desc 2', is_completed: true },
];

describe('TaskList', () => {
  it('renders no tasks message', () => {
    render(<TaskList tasks={[]} onMarkDone={() => {}} />);
    expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
  });

  it('renders tasks with correct styles and buttons', () => {
    render(<TaskList tasks={mockTasks} onMarkDone={() => {}} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('calls onMarkDone when Done button is clicked', () => {
    const mockMarkDone = jest.fn();
    render(<TaskList tasks={[mockTasks[0]]} onMarkDone={mockMarkDone} />);
    fireEvent.click(screen.getByText('Done'));
    expect(mockMarkDone).toHaveBeenCalledWith(1);
  });
});
