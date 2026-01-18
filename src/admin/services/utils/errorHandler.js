export const errorHandler = (error) => {
  if (!error.response) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  }

  const { status, data } = error.response;

  if (data?.message) {
    return {
      message: data.message,
      status,
      errors: data.errors || null,
    };
  }

  switch (status) {
    case 400:
      return { message: 'Bad request', status };
    case 401:
      return { message: 'Unauthorized', status };
    case 403:
      return { message: 'Access denied', status };
    case 404:
      return { message: 'Resource not found', status };
    case 500:
      return { message: 'Server error', status };
    default:
      return {
        message: 'Something went wrong',
        status,
      };
  }
};
