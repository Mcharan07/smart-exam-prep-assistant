export const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase()}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateDaysRemaining = (examDate) => {
  const today = new Date();
  const exam = new Date(examDate);
  const diffTime = exam - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getProgressColor = (percentage) => {
  if (percentage < 30) return 'bg-red-500';
  if (percentage < 70) return 'bg-yellow-500';
  return 'bg-green-500';
};