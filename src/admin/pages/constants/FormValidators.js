import dayjs from 'dayjs';

export const requiredRule = (label = 'This field') => ({
  required: true,
  message: `${label} is required`,
});

export const onlyLettersRule = (label = 'This field') => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (!/^[A-Za-z\s]+$/.test(value)) {
      return Promise.reject(`${label} can contain only letters`);
    }

    return Promise.resolve();
  },
});

export const onlyDigitsRule = (label = 'This field') => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (!/^\d+$/.test(value)) {
      return Promise.reject(`${label} must contain only digits`);
    }

    return Promise.resolve();
  },
});

export const fixedDigitsRule = (length, label = 'This field') => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    const regex = new RegExp(`^\\d{${length}}$`);
    if (!regex.test(value)) {
      return Promise.reject(`${label} must be ${length} digits`);
    }

    return Promise.resolve();
  },
});

export const regexRule = (regex, message) => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (!regex.test(value)) {
      return Promise.reject(message);
    }

    return Promise.resolve();
  },
});

export const noFutureDateRule = (label = 'Date') => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (dayjs(value).isAfter(dayjs(), 'day')) {
      return Promise.reject(`${label} cannot be a future date`);
    }

    return Promise.resolve();
  },
});

export const safeAddressRule = () => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (!/^[A-Za-z0-9\s,.-/]+$/.test(value)) {
      return Promise.reject('Address contains invalid characters');
    }

    return Promise.resolve();
  },
});

export const digitsWithLengthValidator = (label = 'This field', length) => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    if (!/^\d+$/.test(value)) {
      return Promise.reject(new Error(`${label} must contain only digits`));
    }

    if (length && value.length !== length) {
      return Promise.reject(new Error(`${label} must be exactly ${length} digits`));
    }

    return Promise.resolve();
  },
});
