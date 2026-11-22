const day = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const sampleTasks = [
  { id: 'task-101', title: 'Design landing page', description: 'Create a clear, welcoming first impression for the product.', category: 'Design', status: 'In progress', priority: 'High', dueDate: day(1) },
  { id: 'task-102', title: 'Fix mobile navigation', description: 'Review the menu interactions on smaller screens.', category: 'Development', status: 'To do', priority: 'Medium', dueDate: day(2) },
  { id: 'task-103', title: 'Review onboarding flow', description: 'Walk through the new-user journey and note friction points.', category: 'Research', status: 'Completed', priority: 'Low', dueDate: day(-1) },
  { id: 'task-104', title: 'Prepare launch checklist', description: 'Gather the final checks for the next product release.', category: 'Planning', status: 'To do', priority: 'High', dueDate: day(3) },
  { id: 'task-105', title: 'Update component library', description: 'Document the latest buttons, inputs and card patterns.', category: 'Development', status: 'In progress', priority: 'Medium', dueDate: day(5) },
  { id: 'task-106', title: 'Test checkout experience', description: 'Check validation, empty states and confirmation feedback.', category: 'Testing', status: 'Completed', priority: 'High', dueDate: day(-2) },
  { id: 'task-107', title: 'Write release notes', description: 'Summarize the improvements in this release for customers.', category: 'Content', status: 'To do', priority: 'Low', dueDate: day(6) },
];
